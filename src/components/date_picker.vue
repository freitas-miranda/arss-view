<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      max-width="290px"
      min-width="auto"
      offset-y
      transition="scale-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-facade="mascara"
          v-bind="attrs"
          :disabled="disabled"
          :error-messages="errorMessages"
          :label="label"
          :hide-details="hideDetails"
          :readonly="readonly"
          :value="value"
          append-icon="mdi-calendar-month-outline"
          autocomplete="off"
          clearable
          filled
          persistent-hint
          v-on="!readonly ? on : ''"
          @input="$emit('input', $event), formatarDataEN($event)"
          @click:append="!readonly ? menu = true : ''"
        />
      </template>
      <v-date-picker
        v-model="data"
        :max="max ? $day(max, mascaraPT).format(mascaraEN) : undefined"
        :min="min ? $day(min, mascaraPT).format(mascaraEN) : undefined"
        :type="type === 'datetime' ? 'date' : type"
        color="primary"
        no-title
        @input="formatarDataPT($event), menu = false"
      >
        <v-btn
          block
          color="primary"
          outlined
          @click="formatarDataPT($day().format(mascaraEN)), menu = false"
        >
          Hoje - {{ $day().format(mascaraPT) }}
        </v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'ComponenteDatePicker',
  props: {
    disabled: {
      default: false,
      required: false,
      type: Boolean
    },
    errorMessages: {
      default: '',
      required: false,
      type: [Array, String]
    },
    hideDetails: {
      default: false,
      required: false,
      type: Boolean
    },
    label: {
      default: '',
      required: false,
      type: String
    },
    max: {
      default: undefined,
      required: false,
      validator: prop => typeof prop === 'string' || prop === undefined
    },
    min: {
      default: undefined,
      required: false,
      validator: prop => typeof prop === 'string' || prop === undefined
    },
    readonly: {
      default: false,
      required: false,
      type: Boolean
    },
    type: {
      default: 'date',
      required: false,
      type: String
    },
    value: {
      required: true,
      validator: prop => typeof prop === 'string' || prop === null
    }
  },
  data () {
    return {
      data: null,
      menu: false
    }
  },
  computed: {
    mascara () {
      let mascara

      switch (this.type) {
        case 'date':
          mascara = '##/##/####'
          break
        case 'datetime':
          mascara = '##/##/#### ##:##:##'
          break
        case 'month':
          mascara = '##/####'
          break
      }

      return mascara
    },
    mascaraEN () {
      let mascara

      switch (this.type) {
        case 'date':
          mascara = 'YYYY-MM-DD'
          break
        case 'datetime':
          mascara = 'YYYY-MM-DD HH:mm:ss'
          break
        case 'month':
          mascara = 'YYYY-MM'
          break
      }

      return mascara
    },
    mascaraPT () {
      let mascara

      switch (this.type) {
        case 'date':
          mascara = 'DD/MM/YYYY'
          break
        case 'datetime':
          mascara = 'DD/MM/YYYY HH:mm:ss'
          break
        case 'month':
          mascara = 'MM/YYYY'
          break
      }

      return mascara
    }
  },
  methods: {
    formatarDataEN (parametro) {
      if (parametro && parametro.length === this.mascaraPT.length) {
        if (this.$day(parametro, this.mascaraPT).format(this.mascaraPT) === parametro) {
          this.data = this.$day(parametro, this.mascaraPT).format(this.mascaraEN)
        } else {
          this.data = null
        }
      } else {
        this.data = null
      }
    },
    formatarDataPT (parametro) {
      if (parametro.length) {
        if (this.type === 'month') parametro = parametro + '-01'
        else if (this.type === 'datetime') {
          if (parametro.length === 19) {
            parametro = parametro.substr(0, 10)
          }

          parametro = parametro + ' ' + this.$day().format('HH:mm:ss')
        }

        this.$emit('input', this.$day(parametro, this.mascaraEN).format(this.mascaraPT))
      }
    }
  }
}
</script>
