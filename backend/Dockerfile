FROM public.ecr.aws/lambda/python:3.12

WORKDIR /var/task

COPY pyproject.toml uv.lock ./

RUN dnf install -y gcc gcc-c++ make && \
    dnf clean all && \
    pip install --no-cache-dir uv && \
    uv export --frozen --no-dev --format requirements.txt -o requirements.txt && \
    pip install --no-cache-dir -r requirements.txt

COPY app ./app

CMD ["app.main.handler"]
