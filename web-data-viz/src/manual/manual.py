from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite o frontend JS chamar essa API

# Dados do tour - cada passo aponta para um elemento do dashboard
TOUR_STEPS = [
    {
        "id": 1,
        "target": "#kpi-alunos",
        "titulo": "Total de Alunos em Risco",
        "descricao": "Exibe a quantidade total de alunos atualmente vinculados aos cursos da instituição.",
        "posicao": "bottom"
    },
    {
        "id": 2,
        "target": "#kpi-risco",
        "titulo": "Alunos em Risco",
        "descricao": "Mostra o número de alunos classificados com risco acadêmico alto, indicando necessidade de acompanhamento.",
        "posicao": "bottom"
    },
    {
        "id": 3,
        "target": "#kpi-curso-risco",
        "titulo": "Curso com Mais Alunos em Risco",
        "descricao": "Identifica o curso que possui a maior concentração de alunos em situação de risco acadêmico.",
        "posicao": "bottom"
    },
    {
        "id": 4,
        "target": "#grafico-media",
        "titulo": "Evolução da Média Acadêmica (Último Semestre)",
        "descricao": "Apresenta a variação da média geral dos alunos ao longo do último semestre, permitindo acompanhar tendências de desempenho.",
        "posicao": "top"
    },
    {
        "id": 5,
        "target": "#graficoMediaCurso",
        "titulo": "Média de Notas por Curso",
        "descricao": "Compara a média acadêmica entre os cursos, facilitando a identificação dos melhores e piores desempenhos.",
        "posicao": "top"
    },
    {
        "id": 6,
        "target": "#grafico-cursos",
        "titulo": "Top 5 Cursos com Mais Alunos",
        "descricao": "Exibe os cinco cursos com maior quantidade de alunos matriculados na instituição.",
        "posicao": "left"
    }
]

@app.route("/manual", methods=["GET"])
def get_tour():
    return jsonify({
        "status": "ok",
        "total_passos": len(TOUR_STEPS),
        "passos": TOUR_STEPS
    })

@app.route("/manual/status", methods=["GET"])
def status():
    return jsonify({"status": "Manual API rodando", "versao": "1.0"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000, debug=True)