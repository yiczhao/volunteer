FROM kssz/nginx
MAINTAINER chenyongbing

ARG KS_PROJECT_NAME
ENV KS_PROJECT_NAME $KS_PROJECT_NAME
ENV KS_PROJECT_PORT 80
EXPOSE $KS_PROJECT_PORT

COPY index.html /usr/share/nginx/html/
COPY dist /usr/share/nginx/html/dist