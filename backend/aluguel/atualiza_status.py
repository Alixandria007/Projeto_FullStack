from . import models
from datetime import date

class AtualizarStatus:
    def __init__(self,get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Evita loop infinito: verifica se a requisição é GET (não de salvamento)
        if request.method == 'GET':
            # Atualiza os aluguéis vencidos apenas em requisições de leitura
            aluguéis_vencidos = models.Aluguel.objects.filter(status='P', vencimento__lt=date.today())
            for aluguel in aluguéis_vencidos:
                aluguel.status = 'V'
                aluguel.save(update_fields=['status'])  # Salva apenas o campo de status para evitar loops

        response = self.get_response(request)
        return response