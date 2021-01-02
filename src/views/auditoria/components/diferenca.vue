<template>
  <v-card>
    <aviso v-model="avisoDiferenca">
      Selecione no mínimo uma diferença para efetuar o envio da fila.
    </aviso>
    <v-toolbar
      color="primary"
      dark
      dense
      flat
    >
      <v-toolbar-title class="font-weight-medium">
        Diferenças
      </v-toolbar-title>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            small
            v-bind="attrs"
            v-on="on"
          >
            <v-icon left>
              mdi-dots-vertical
            </v-icon>
            Mais Opções
          </v-btn>
        </template>
        <v-list class="py-0">
          <v-list-item @click="copiarRecnos()">
            <v-list-item-icon>
              <v-icon color="primary">
                mdi-content-copy
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Copiar RECNOs
            </v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item @click="enviarFila()">
            <v-list-item-icon>
              <v-icon color="primary">
                mdi-send-circle-outline
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Enviar para Fila
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <tabela
      v-if="diferencas.length"
      ref="tabela"
      v-model="selecionado"
      :colunas="colunas"
      :remover-rodape="true"
      :registros="diferencas"
      item-key="origemId"
      selecionar-registros
      @excel="exportarExcel()"
    >
      <template v-slot:[`item.acao`]="{ item }">
        <v-btn
          class="botao-acao-tabela"
          color="primary"
          icon
          title="Reagendar"
          @click.stop="reagendar(item.origemId)"
        >
          <v-icon size="20">
            mdi-history
          </v-icon>
        </v-btn>
        <v-btn
          class="botao-acao-tabela"
          color="primary"
          icon
          title="Lançar"
          @click.stop="lancarFila(item.origemId)"
        >
          <v-icon size="20">
            mdi-play
          </v-icon>
        </v-btn>
      </template>
    </tabela>
    <v-card-text
      v-else
      class="text-center body-1 font-weight-medium"
    >
      <div v-if="diaSelecionado">
        Diferenças não foram processadas!
      </div>
      <div v-else>
        Selecione um dia!
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'AuditoriaDiferenca',
  data () {
    return {
      avisoDiferenca: false,
      colunas: [
        {
          align: 'center',
          sortable: false,
          text: 'Ação',
          value: 'acao',
          width: 50
        },
        {
          align: 'center',
          text: 'Recno',
          value: 'origemId',
          width: 150
        },
        {
          align: 'end',
          text: 'Qtd. Loja',
          value: 'qtdLoja',
          width: 150
        },
        {
          align: 'end',
          text: 'Qtd. Estoque',
          value: 'qtdEstoque',
          width: 150
        },
        {
          align: 'end',
          text: 'Diferença',
          value: 'diferenca',
          width: 150
        },
        {
          sortable: false
        }
      ],
      selecionado: []
    }
  },
  computed: {
    ...mapGetters('auditoria', [
      'total'
    ]),
    ...mapState('app', [
      'usuario'
    ]),
    ...mapState('auditoria', [
      'dias',
      'diaSelecionado',
      'diferencas',
      'fluxos',
      'fluxoSelecionado'
    ])
  },
  methods: {
    ...mapActions('auditoria', [
      'obterDiferencas',
      'processarAuditoriaDia',
      'processarDiferenca',
      'processarEnvioFila',
      'reagendar',
      'lancar'
    ]),
    copiarRecnos () {
      let recnos

      if (this.selecionado.length) recnos = this.selecionado.map(item => item.origemId)
      else recnos = this.diferencas.map(item => item.origemId)

      this.$copyText(recnos.join(', ')).then(() => {
        this.$notificacao('RECNOs das diferenças copiado com sucesso!')
      }, () => {
        this.$notificacao('Não foi possível copiar os RECNOs das diferenças!', 'erro')
      })
    },
    enviarFila () {
      if (this.selecionado.length) {
        this.processarEnvioFila({
          auditoria: this.diaSelecionado,
          fluxo: [this.fluxoSelecionado],
          diaMovimento: this.$day(this.dias.find(item => item.auditoriaId === this.diaSelecionado).diaMovimento, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          recno: this.selecionado.map(item => item.origemId),
          login: this.usuario,
          banco: this.fluxos.find(item => item.fluxoId === this.fluxoSelecionado).banco
        })
      } else {
        this.avisoDiferenca = true
      }
    },
    async lancarFila (recno) {
      const result = await this.lancar(recno)
      if (result) {
        this.$notificacao(`Sucesso! ${JSON.stringify(result)}`)
      }
    },
    exportarExcel () {
      this.$exportarExcel(this.diferencas, this.colunas)
    }
  }
}
// :totais="totais"
</script>
