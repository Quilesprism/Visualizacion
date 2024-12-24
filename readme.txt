gcloud config set project 	iabogadi-core

gcloud builds submit --tag us-central1-docker.pkg.dev/iabogadi-core/gcf-artifacts/chatlogin:v3
gcloud auth login

gcloud run deploy chatlogin  --image us-central1-docker.pkg.dev/iabogadi-core/gcf-artifacts/chatlogin:v3 --region us-central1  --project iabogadi-core