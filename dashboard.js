const express = require('express');
const dashboard = express();
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-discord').Strategy;
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

module.exports = client => {
    const dashboardDirectory = path.resolve(`${process.cwd()}${path.sep}dashboard`); // root/dashboard
    const templatesDirectory = path.resolve(`${dashboardDirectory}${path.sep}templates`); // root/dashboard/templates
    dashboard.use("/public", express.static(path.resolve(`${dashboardDirectory}${path.sep}public`))); //root/dashboard/public

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    passport.use(
        new Strategy({
            clientID: "860842611970932767",
            clientSecret: "b1mL9ITKJH6qgocmVG9_BFVQa0mt54TJ",
            callbackUrl: "http://localhot:3030/callback",
            scope: ["identify", "guilds"]
        },
        (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => done(null, profile));
        })
    );

    dashboard.use(session({
        store: new MemoryStore({ checkPeriod: 999999999 }),
        secret: "pixelbotsecret_P63wKys2V",
        resave: false,
        saveUninitialized: false
    }));

    dashboard.use(passport.initialize());
    dashboard.use(passport.session());

    dashboard.engine("html", require("ejs").renderFile);
    dashboard.set("view engine", "html");

    let callbackUrl = "/";

    const renderTemplate = (res, req, template, data = {}) => {
        const baseData = {
            callbackUrl: callbackUrl,
            bot: client,
            path: req.path,
            user: req.isAuthenticated() ? req.user : null
        };
        res.render(path.resolve(`${templatesDirectory}${path.sep}${template}`), Object.assign(baseData, data));
    };

    dashboard.get("/login", (req, res, next) => {
        req.session.backURL = "/";
        next();
    },
    passport.authenticate("discord", )
    );

    dashboard.get("/callback", passport.authenticate("discord"), (req, res) => {
        res.redirect(callbackUrl);
    });

    dashboard.get("/logout", (req, res) => {
        req.session.destroy(() => {
            req.logout();
            res.redirect("/");
        });
    });

    dashboard.get("/dashboard/:guildId", async (req, res) => {
        const guildId = req.params.guildId;
        callbackUrl = `/dashboard/${guildId}`;
        const modules = await client.getModulesFromId(guildId);
        renderTemplate(res, req, "dashboard.ejs", {
            params: {
                guildId: guildId
            },
            modules: {
                modules: modules
            }
        });
    });

    dashboard.get("/dashboard/:guildId/:moduleName/active/:state", async (req, res) => {
        const guildId = req.params.guildId;
        const moduleName = req.params.moduleName;
        const newState = req.params.state;
        callbackUrl = `/dashboard/${guildId}/state/${moduleName}`;
        if (moduleName == 'moderation') await client.updateModulesFromId(guildId, { moderation: newState });
        if (moduleName == 'experience') await client.updateModulesFromId(guildId, { experience: newState });
        if (moduleName == 'misc') await client.updateModulesFromId(guildId, { misc: newState });
        res.redirect(`/dashboard/${guildId}`);
    });

    dashboard.get("/dashboard", async (req, res) => {
        callbackUrl = "/dashboard";
        if (!req.isAuthenticated()) {
            const members = client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b);
            const channels = client.channels.cache.size;
            const guilds = client.guilds.cache.size;
            renderTemplate(res, req, "home.ejs", {
                stats: {
                    guilds: guilds,
                    channels: channels,
                    members: members
                }
            });
        } else {
            let userGuilds = [];
            let userGuildsExists = [];
            let user = req.user;
            for (var i = 0; i < user.guilds.length; i++) {
                if (user.guilds[i].permissions == "2147483647") {
                    userGuilds.push(user.guilds[i]);
                    if (await client.guildExist(user.guilds[i].id)) {
                        userGuildsExists.push(true);
                    } else {
                        userGuildsExists.push(false);
                    }
                }
            }
            renderTemplate(res, req, "server-selection.ejs", {
                modules: {
                    userGuilds: userGuilds,
                    userGuildsExists: userGuildsExists
                }
            });
        }
    });

    dashboard.get("/", (req, res) => {
        callbackUrl = "/";
        const members = client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b);
        const channels = client.channels.cache.size;
        const guilds = client.guilds.cache.size;
        renderTemplate(res, req, "home.ejs", {
            stats: {
                guilds: guilds,
                channels: channels,
                members: members
            }
        });
    });

    const port = process.env.DASHBOARD_PORT;
    client.site = dashboard.listen(port);
    console.log(`Serveur web démarré sur le port ${port}`);
};