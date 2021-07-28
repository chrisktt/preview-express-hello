echo "--------------------------------"
# Simulate Render production environment
(
set -a # begin export all variables
set -x
# Set by YAML
NODE_ENV=production

# Documented Render variables: https://render.com/docs/environment-variables
IS_PULL_REQUEST=false
RENDER=true
RENDER_EXTERNAL_HOSTNAME=express-helloo-world.onrender.com
RENDER_EXTERNAL_URL=https://express-helloo-world.onrender.com
RENDER_GIT_BRANCH=main
RENDER_GIT_COMMIT=e726a915d23cf7460de2ec26c541d30a4024038d
RENDER_GIT_REPO_SLUG=chrisktt/express-hello-world
RENDER_INSTANCE_ID=srv-c3s4j5t0mal7ecd807bg-644b4fd494-hsg5m
RENDER_SERVICE_NAME=express-helloo-world
RENDER_SERVICE_TYPE=web

# Database info
# DB_URI=mongodb://aXelFoleY:b3v3rlyHi77s*C0p@portal-ssl2194-11.mpcssurveys18.3038111348.composedb.com:16918,portal-ssl2470-10.mpcssurveys18.3038111348.composedb.com:16918/surveys-test?ssl=true
DB_USER=aXelFoleY
DB_PASS=b3v3rlyHi77s*C0p
DB_SERVER=portal-ssl2194-11.mpcssurveys18.3038111348.composedb.com:16918,portal-ssl2470-10.mpcssurveys18.3038111348.composedb.com:16918
DB_NAME=surveys-test
DB_OPTIONS="useUnifiedTopology=true&tls=true&useNewUrlParser=true"
DB_URI=mongodb://$DB_USER:$DB_PASS@$DB_SERVER/$DB_NAME?$DB_OPTIONS

set +x
set +a # end of export

yarn start
)
