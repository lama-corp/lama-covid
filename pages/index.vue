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
        <strong>prévision de la réanimation</strong> associée à de l'épidémie de
        la Covid-19 en France.
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
        version (en cours de développement), à pouvoir
        <strong>appliquer ses propres mesures sanitaires</strong>.
        <i>Chaque mesure sanitaire est un choix politique et sanitaire.</i
        ><br />
        Pour deux <strong>restrictions</strong> différentes, il peut y avoir un
        même impact sur l'épidémie mais des conséquences différentes sur
        l'économie et le social.
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
          <h2 id="simulator">Simulateur de mesures sanitaires</h2>
          <p>
            Afin de visualiser l'impact des restrictions sanitaires sur
            l'évolution de l'épidémie en France, utilisez notre
            <strong>simulateur de mesures sanitaires</strong>.
          </p>
          <div class="pt-5 flex justify-around flex-wrap">
            <div v-for="restriction in restrictions" :key="restriction.name">
              <input-toggle
                v-model="restriction.isActive"
                :disabled="restriction.disabled"
                :label="$t(`constants.restrictions.${restriction.name}.label`)"
                :sub-label="
                  $t(`constants.restrictions.${restriction.name}.subLabel`)
                "
              />
              <InputNumber
                v-model="restriction.coefficient"
                label="Efficacité en pourcentage"
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
        <h3 class="prevision-cases">Prévisions du nombre de cas</h3>
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
        <h3>Prévisions du nombre de lits occupés en réanimation</h3>
        <p>
          La courbe des réanimation est scindée en trois sous ensembles : le
          nombre de personnes en réanimation actuellement (en gris), la
          prévision basée sur le nombre de cas actuel (en orange) et la
          prévision basée sur le
          <a href="#prevision-cases">nombre de cas à venir</a> (en rouge
          saumon).
        </p>
        <p>
          La prévision basée sur le nombre actuel de cas suit le principe
          suivant : la tendance du nombre de cas positifs suit la tendance du
          nombre place occupées en réanimation modulo un certain nombre de
          jours.<br />
          <span class="flex justify-center">
            <nuxt-img
              class="block"
              src="methodology/RtDailyPositivesOld_RtHosp_small.png"
              quality="10"
            />
          </span>
          Pour calculer la <strong>prévision du nombre de réanimation</strong>,
          on applique simplement la tendance à l'occupation actuelle modulo 9
          jours.
        </p>
        <p>
          La seconde partie de la prévision du nombre de lits occupés en
          réanimation est basée sur la prédiction du nombre de cas. Puis à ce
          nombre de cas est appliqué le même principe que précédemment.
        </p>

        <h3 id="inertia-hospitalizations">Erreurs et pourcentages d'erreur</h3>
        <p>
          Les courbes ne sont pas et ne se veulent pas être des prévisions
          exactes.<br />
          Sachez simplement que si vous constatez un dépassement important des
          capacités de réanimation,
          <strong>des mesures sanitaires seront appliquées</strong> par le
          gouvernement. A partir de la mise en application de ces mesures, les
          courbes seront faussées de manière plus ou moins conséquente pour une
          durée de 10 jours.
          <a href="#simulator">Le simulateur de mesure</a> est fait pour pallier
          en partie à cette perte de fiabilité.
        </p>
        <p>
          Il peut exister des <strong>restrictions locales</strong> au travers
          d'arrêtés préfectoraux. Ces mesures sont actuellement ignorées car
          trop complexe à prendre en considération de part leur diversité. Un
          paramètre global est en cours de réflexion.
        </p>
        <p>
          Si aucune restriction n'est appliquée, une erreur subsiste. La courbe
          suivante représente
          <i>la variation du nombre de cas chez les personnes à risque</i>
          (personnes comprises entre 60 et 89 ans) et la
          <i>variation du nombre de lits occupés en réanimation</i> avec un
          délai de 18 jours.
          <span class="flex justify-center">
            <nuxt-img
              class="block"
              src="methodology/dailyPositivesOld_hosp_ratio1_small.png"
              quality="10"
            />
          </span>
          Vous pouvez contatez que les courbes sont initialement proches, puis
          séparent tout en gardant la même tendance (baisse, stabilisation,
          hausse).<br />
          Sur les dates sélectionnées, le pourcentage d'erreur moyen par semaine
          est de : (Valeur d'arrivée / Valeur de départ)^(1/n). Soit (891 /
          211)^(1/14) = 0,0714 = 7.14% (<a
            href="http://www.mathematiques.club/terminale-es-et-l-specialite/evolutions-pourcentages/article/calculer-un-taux-d-evolution-moyen"
            target="_blank"
            >source calcul</a
          >).<br />
          Ce pourcentage d'erreur est un pourcentage moyen. Parfois les
          prévisions sont fiables,
          <strong>
            parfois une erreur allant jusqu'à 20% par semaine est constatée </strong
          >.
        </p>
      </div>
    </div>
    <!-- TODO
    <Faq />
    -->
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
