from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite o frontend JS chamar essa API

# Dados do tour - cada passo aponta para um elemento do dashboard
TOUR_STEPS = [
    {
        "id": 1,
        "target": "#kpi-evasao",
        "titulo": "Taxa de Evasão",
        "descricao": "Mostra o percentual de alunos que abandonaram a instituição no semestre atual. Um valor menor que o semestre anterior (seta vermelha para baixo) indica melhora.",
        "posicao": "bottom"
    },
    {
        "id": 2,
        "target": "#kpi-risco",
        "titulo": "Alunos em Risco",
        "descricao": "Percentual de alunos com alto risco de evasão identificados pelo sistema. Requer atenção quando está acima de 25%.",
        "posicao": "bottom"
    },
    {
        "id": 3,
        "target": "#kpi-semestre",
        "titulo": "Evasões no Semestre",
        "descricao": "Total de evasões confirmadas no semestre vigente comparado ao anterior. Valor acima de 50% exige intervenção imediata.",
        "posicao": "bottom"
    },
    {
        "id": 4,
        "target": "#grafico-evolucao",
        "titulo": "Evolução da Taxa de Evasão",
        "descricao": "Gráfico de linha com os últimos 6 semestres. Permite identificar tendências de alta ou queda na evasão ao longo do tempo.",
        "posicao": "top"
    },
    {
        "id": 5,
        "target": "#grafico-cursos",
        "titulo": "Evasão por Curso — Top 5",
        "descricao": "Ranking horizontal dos 5 cursos com maior número de alunos evadidos. Use para priorizar ações de retenção por curso.",
        "posicao": "top"
    },
    {
        "id": 6,
        "target": "#graficoPizza",
        "titulo": "Motivos de Evasão",
        "descricao": "Gráfico de rosca com os principais motivos: Financeiro (35%), Pessoal (30%), Acadêmico (20%), Trabalho (5%) e Outros (10%).",
        "posicao": "left"
    }
]

@app.route("/manual/tour", methods=["GET"])
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
    app.run(port=4000, debug=True)