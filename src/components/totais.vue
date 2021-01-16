<template>
  <div>
    <v-divider color="#ddd" />
    <v-row class="ma-0">
      <v-col cols="12 ma-0 pa-0">
        <v-card
          class="pb-1"
          height="100%"
          width="100%"
          style="border-radius: 0px;"
        >
          <v-chip
            class="mr-2 mt-1"
            color="primary"
            label
            text-color="white"
            style="border-radius: 0px !important;"
          >
            <span class="pl-0 py-1 pr-2 title">
              <i>Totais:</i>
            </span>
          </v-chip>
          <v-chip
            v-for="(registro, index) in items"
            :key="index"
            class="mr-2 mt-1"
            color="primary"
            text-color="white"
          >
            {{ registro.text }}:<b class="pl-1">{{ registro.value }}</b>
          </v-chip>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ComponenteTotais',

  props: {
    items: {
      required: true,
      default: () => {
        return []
      },
      type: Array
    }
  }
}
</script>
