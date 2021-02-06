(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{72:function(e,a,t){"use strict";t.r(a),t.d(a,"frontMatter",(function(){return r})),t.d(a,"metadata",(function(){return i})),t.d(a,"toc",(function(){return c})),t.d(a,"default",(function(){return p}));var n=t(3),o=t(7),l=(t(0),t(86)),r={id:"installation",title:"Installation",sidebar_label:"Installation"},i={unversionedId:"getting-started/installation",id:"getting-started/installation",isDocsHomePage:!1,title:"Installation",description:"Prerequisites",source:"@site/docs/getting-started/installation.md",slug:"/getting-started/installation",permalink:"/getting-started/installation",editUrl:"https://github.com/graphql-portal/graphql-portal/edit/master/website/docs/getting-started/installation.md",version:"current",sidebar_label:"Installation",sidebar:"docs",previous:{title:"Quick Start",permalink:"/getting-started/quick-start"}},c=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Docker Compose",id:"docker-compose",children:[]},{value:"Standalone Docker containers",id:"standalone-docker-containers",children:[]},{value:"Standalone Gateway with Yarn/NPM",id:"standalone-gateway-with-yarnnpm",children:[]},{value:"Standalone Dashboard without Docker",id:"standalone-dashboard-without-docker",children:[]}],s={toc:c};function p(e){var a=e.components,t=Object(o.a)(e,["components"]);return Object(l.b)("wrapper",Object(n.a)({},s,t,{components:a,mdxType:"MDXLayout"}),Object(l.b)("h3",{id:"prerequisites"},"Prerequisites"),Object(l.b)("p",null,"Unless installed via docker compose, you will need:"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"Redis \u2013 required by Gateway and Dashboard"),Object(l.b)("li",{parentName:"ul"},"MongoDB - required by Dashboard only")),Object(l.b)("h3",{id:"docker-compose"},"Docker Compose"),Object(l.b)("p",null,"Check out ",Object(l.b)("a",{parentName:"p",href:"https://github.com:graphql-portal/graphql-portal-docker"},"our dedicated repository")," with docker compose files and examples of the configuration:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"git clone git@github.com:graphql-portal/graphql-portal-docker.git\ncd graphql-portal-docker\n\ndocker-compose -f docker-compose.yml up\n")),Object(l.b)("h3",{id:"standalone-docker-containers"},"Standalone Docker containers"),Object(l.b)("p",null,"Install and launch the Gateway:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"docker pull gqlportal/gateway:latest\n")),Object(l.b)("p",null,"Now that you have Docker image locally, you will need to prepare a basic configuration file.\nYou may download a sample config:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"curl -s -o ./gateway.yaml https://raw.githubusercontent.com/graphql-portal/graphql-portal-docker/main/basic.gateway.yaml\n")),Object(l.b)("p",null,"Once that is done, you can now launch the Gateway in a standalone mode (you may have to specify a Redis connection\nstring relevant to your local environment):"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},'docker run --name graphql-gateway \\\n  -p 3000:3000 \\\n  -e REDIS="redis://localhost:6379" \\\n  -v $(pwd)/gateway.yaml:/opt/graphql-portal/config/gateway.yaml \\\n  gqlportal/gateway:latest\n')),Object(l.b)("p",null,"Install and launch Dashboard:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},'docker pull gqlportal/dashboard:latest\n\n# Modify the connection strings depending on your environment\ndocker run --name graphql-dashboard \\\n  -e REDIS_CONNECTION_STRING="redis://localhost:6379" \\\n  -e MONGODB_CONNECTION_STRING="mongodb://localhost:27017" \\\n  -e DASHBOARD_PORT=3030 \\\n  -e NODE_ENV=production \\\n  -p 3030:3030 \\\n  gqlportal/dashboard:latest\n')),Object(l.b)("p",null,"You now should be able to open the configuration dashboard by going to http://localhost:3030 in your browser."),Object(l.b)("h3",{id:"standalone-gateway-with-yarnnpm"},"Standalone Gateway with Yarn/NPM"),Object(l.b)("p",null,"The Gateway can also be installed either via npm/yarn, or by pulling this repository and then building the source codes."),Object(l.b)("p",null,"The package ",Object(l.b)("inlineCode",{parentName:"p"},"@graphql-portal/gateway")," provides a CLI command ",Object(l.b)("inlineCode",{parentName:"p"},"graphql-portal")," which will start the server.\nHowever, in order for the server to start correctly, we should first create (or download) a configuration file. By\ndefault, GraphQL Portal will search for a configuration in ",Object(l.b)("inlineCode",{parentName:"p"},"./config/gateway.json|yaml")," file. That's why, prior to\nlaunching the gateway, you may want to create a directory and place a config file into it. You can use a ",Object(l.b)("a",{parentName:"p",href:"https://raw.githubusercontent.com/graphql-portal/graphql-portal-docker/main/basic.gateway.yaml"},"basic configuration\nfile"),"\nfrom our ",Object(l.b)("a",{parentName:"p",href:"https://github.com/graphql-portal/graphql-portal-docker"},"examples repository here"),"."),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"# create directories for configuration\nmkdir -p /opt/graphql-portal/config && cd /opt/graphql-portal\n\n# download a basic configuration file\ncurl -s -o ./config/gateway.yaml https://raw.githubusercontent.com/graphql-portal/graphql-portal-docker/main/basic.gateway.yaml\n")),Object(l.b)("p",null,"Now that the configuration is in place, we can install and launch the gateway:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},'# install the gateway and go to the directory with configuration\nyarn global add @graphql-portal/gateway\n\n# @graphql-portal/gateway package provides a CLI command graphql-portal\n# we will also need a Redis connection string in order to launch the gateway\nenv REDIS="redis://localhost:6379" NODE_ENV=production graphql-portal\n')),Object(l.b)("p",null,"You should now see the output of the server without any errors.\n",Object(l.b)("a",{parentName:"p",href:"#configuration"},"Read more about the configuration of the gateway here.")),Object(l.b)("h3",{id:"standalone-dashboard-without-docker"},"Standalone Dashboard without Docker"),Object(l.b)("p",null,"At the moment, GraphQL Portal Dashboard consists from the following components:"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"Backend (NestJS)"),Object(l.b)("li",{parentName:"ul"},"Frontend (React),")),Object(l.b)("p",null,"and requires the following dependencies:"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"MongoDB"),Object(l.b)("li",{parentName:"ul"},"connection to Redis \u2013 same Redis used by Gateway.")),Object(l.b)("p",null,"It is not distributed via Yarn/NPM and can be installed locally by pulling and building the source code from the repository:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"mkdir /opt/graphql-portal-dashboard\ngit clone https://github.com/graphql-portal/graphql-portal-dashboard /opt/graphql-portal-dashboard\n\ncd /opt/graphql-portal-dashboard\n\n# the following two steps can take some time\nyarn install --frozen-lockfile\nyarn build\n")),Object(l.b)("p",null,"We'll have to edit the configuration file before launching the server. To do that, open the configuration file for\n",Object(l.b)("em",{parentName:"p"},"production")," environment:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},"vim packages/backend/config/env/production.json\n")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-json"},'{\n  "application": {\n    "env": "production",\n    "useSwaggerUi": false,\n    "port": "@@DASHBOARD_PORT",\n    "graphQL": {\n      "playground": false,\n      "debug": false\n    },\n    "logLevel": "log"\n  },\n  "db": {\n    "redis": {\n      "connectionString": "@@REDIS_CONNECTION_STRING"\n    },\n    "mongodb": {\n      "connectionString": "@@MONGODB_CONNECTION_STRING"\n    }\n  }\n}\n')),Object(l.b)("p",null,"In that file, we have 3 main configuration variables which we have to specify:"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"port \u2013 it is a port on which the dashboard application is going to be available;"),Object(l.b)("li",{parentName:"ul"},"redis:connectionString \u2013 self-explicative, connection string for Redis"),Object(l.b)("li",{parentName:"ul"},"mongodb:connectionString \u2013 connection string for Mongo.")),Object(l.b)("p",null,"Now, we have two choices: either we can pass these values as environment variables, or we can put them directly in the file.\nIn our current case, we will pass them as environment variables. Read more about ",Object(l.b)("a",{parentName:"p",href:"#configuration"},"the configuration of the Gateway and\nDashboard here"),"."),Object(l.b)("p",null,"We can now launch the server:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-shell"},'# replace the following values with those relevant to your environment\nDASHBOARD_PORT=8080 \\\nREDIS_CONNECTION_STRING="redis://localhost:6379" \\\nMONGODB_CONNECTION_STRING="mongodb://localhost:27017" \\\nNODE_ENV=production yarn start:prod\n')),Object(l.b)("p",null,"Once the server is launched, you can open the dashboard by going to http://localhost:8080."))}p.isMDXComponent=!0}}]);