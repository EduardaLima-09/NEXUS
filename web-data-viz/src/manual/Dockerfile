# ═════════════════════════════════════════════════════════════
# DOCKERFILE — API PYTHON (MANUAL INTERATIVO)
# API Flask para servir os passos do tour interativo
# Build: docker build -t nexus-python ./NEXUS/web-data-viz/src/manual
# ═════════════════════════════════════════════════════════════

FROM python:3.11
WORKDIR /app
COPY . .
RUN pip install flask flask-cors
EXPOSE 4000
CMD ["python3", "manual.py"]
