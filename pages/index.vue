<template>
  <div>
    <SocialHead
      :title="socialShare.title"
      :description="socialShare.description"
      :image="socialShare.image"
    />
    <div>
      <h1 class="text-3xl font-bold leading-tight text-gray-900">
        {{ $t(`pages.index.title`) }}
      </h1>
      <p class="pt-3">
        <strong>Covid Prochaine Vague</strong> est un outil open source de
        <strong>prévision</strong> de l'épidémie de Covid-19 en France.
      </p>
      <p>
        Vous êtes sur la première version de l'outil, n'hésitez pas à suggérer
        des évolutions via
        <a href="https://twitter.com/LamaCodeur" target="_blank">Twitter</a>
        ou participer aux développements sur
        <a href="https://github.com/lama-corp/lama-covid" target="_blank"
          >GitHub</a
        >.<br />
        Première version oblige, les données consultées sont sujettes à erreurs.
        N'interprêtez que les tendances (confer section méthodologie).
        <strong
          >L'objectif de rendre les tendances de l'épidémie
          transparentes</strong
        >.
      </p>
      <p>
        L'objectif principal est d'aider à comprendre l'impact des restrictions
        sanitaires sur l'évolution de la pandémie, mais aussi dès la seconde
        version (en cours de développement), à pouvoir appliquer ses propres
        restrictions.
        <strong>Chaque restriction est un choix politique et sanitaire.</strong
        ><br />
        Pour deux choix de restrictions différents, il peut y avoir un même
        impact sur l'épidémie mais des conséquences différentes sur l'économie
        et le social.
      </p>
      <div id="graphs" class="px-4 sm:px-0">
        <div class="relative px-5">
          <Tabs
            v-model="currentChart"
            :tabs="['hospitalizations', 'cases']"
            t-path="pages.index.charts"
          >
            <ChartPredictionHospitalizations
              v-if="currentChart === 'hospitalizations'"
              :restrictions="restrictions"
            />
            <ChartPredictionCases
              v-if="currentChart === 'cases'"
              :restrictions="restrictions"
            />
            <!--
            <ChartPredictionDeaths
              v-show="currentChart === 'deaths'"
            />
            -->
          </Tabs>
          <h2>Simulateur de mesures sanitaires</h2>
          <p>
            Afin de visualiser l'impact des restrictions sanitaires sur
            l'évolution de l'épidémie en France, utilisez notre
            <strong>simulateur de mesures sanitaires</strong>.
          </p>
          <div class="pt-5 flex justify-around">
            <div v-for="restriction in restrictions" :key="restriction.name">
              <input-toggle
                v-model="restriction.isActive"
                :disabled="restriction.disabled"
                :label="$t(`constants.restrictions.${restriction.name}.label`)"
                :sub-label="
                  $t(`constants.restrictions.${restriction.name}.subLabel`)
                "
              />
            </div>
          </div>
          <p class="pt-5">
            <i>Bientôt disponible</i> : dès la seconde version (disponible
            mi-août), vous pourrez créer / appliquer vos propres restrictions.
          </p>
        </div>
      </div>
      <div class="pt-5">
        <h2>Méthodologie</h2>
        <h3>Informations génériques</h3>
        <p>
          <i>Deux prévisions existent actuellement</i> :
          <strong>nombre de personnes en réanimation</strong>, et
          <strong
            >nombre de nouveaux cas au sein des tranches d'âge à risque</strong
          >
          (personnes de plus de 60 ans).
        </p>
        <p>
          Chaque résultat que vous pouvez consulter est une courbe lissée, afin
          de supprimer les variations au cours de la semaine, principalement
          liées aux dimanches et jours fériés.
        </p>
        <p>
          Chaque restriction sanitaire est appliquée à une date donnée mais est
          appliquée / visible sur les courbes sept jours après. Ceci est dû au
          fait que les effets d'une restriction ne sont pas visibles
          immédiatement. Les courbes gardent une inertie.
        </p>
        <h3>Prévisions du nombre de cas</h3>
        <p>
          Pour prédire le nombre de cas, la règle suivante est appliquée :
          pourcentage d'évolution du jour par rapport à la semaine passée moins
          impact de l'ensemble des règles sanitaires.<br />
          <i>Exemple</i> : Si j'ai, la première semaine, 1000 cas le lundi. La
          seconde, 1200 cas le lundi. Alors, j'aurai un taux de contagion de
          1200 / 1000 = 1.2. Ce taux sera appliqué en semaine 3, à savoir, en
          troisième semaine, j'aurai 1200 * 1.2 = 1440 cas le lundi.<br />
          <i>Exemple avec une restriction</i> : même exemple que précédemment
          mais avec une restriction sanitaire, qui est appliquée le lundi de la
          seconde semaine. Comme indiqué ci-dessus, cette restriction sera
          visible sur les courbes à J+4, soit le lundi de la troisième semaine.
          Pour une restriction ayant un impact de -30% sur les contaminations,
          j'aurai en troisième semaine : 1200 * 1.2 * (1 - 0.3) = 1008 cas.
        </p>
        <h3>Prévisions du nombre d'hospitalisations</h3>
        <h4 id="inertia-hospitalizations">Pourcentages d'erreur</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      restrictions: [
        {
          name: 'healthPassport',
          coefficient: -0.4,
          dateStart: '2021-07-21',
          isActive: true,
          disabled: true,
        },
        {
          name: 'healthPassportExtended',
          coefficient: -0.3,
          dateStart: '2021-08-01',
          isActive: true,
          disabled: false,
        },
      ],
      currentChart: 'hospitalizations',
      socialShare: {
        title: this.$t('pages.index.socialShare.title'),
        description: this.$t('pages.index.socialShare.description'),
        imageUrl: '',
      },
    }
  },
  head() {
    return {
      title: this.$t('pages.index.head.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('pages.index.head.description'),
        },
      ],
    }
  },
}
</script>
