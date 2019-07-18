<template>
  <v-card flat>
    <v-toolbar
      extended
      dark
      flat
    >
      <v-spacer></v-spacer>
      <v-toolbar-title class="font-weight-black headline">🐦 BirdBoard</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <template v-slot:extension>
        <v-combobox
          id="hashtags"
          v-model="hashtags"
          :items="items"
          label="🕵🏻‍♂️ Enter your favorite #hastags "
          chips
          clearable
          prepend-icon="filter_list"
          solo
          multiple
          dark
        >
          <template v-slot:selection="data">
            <v-chip
              :selected="data.selected"
              close
              @input="remove(data.item)"
            >
              <span class="blue--text"># </span>&nbsp;
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-combobox>
      </template>
    </v-toolbar>

    <v-layout row wrap>
      <v-flex xs12>
        <v-card
          v-for="tweet in tweets"
          :key="`${tweet.id}-${tweet.user.id}`"
          :color="getRandomColor()"
          dark
          style="margin: 10px"
        >
          <v-card-text class="headline font-weight-regular">
            {{ tweet.text }}
          </v-card-text>

          <v-card-actions>
            <v-list-tile class="grow">
              <v-list-tile-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  :src="tweet.user.profile_image_url"
                ></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ tweet.user.name }}</v-list-tile-title>
              </v-list-tile-content>

              <v-layout
                align-center
                justify-end
              >
                <span v-if="tweet.favorite_count">
                  <v-icon class="mr-1 red--text">favorite</v-icon>
                  <span class="subheading mr-2">{{ tweet.favorite_count }}</span>
                  <span class="mr-1">·</span>
                </span>

                <span v-if="tweet.retweet_count">
                  <v-icon class="mr-1 green--text">autorenew</v-icon>
                  <span class="subheading">{{ tweet.retweet_count }}</span>
                </span>

              </v-layout>
            </v-list-tile>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

const cardColors = ['blue', 'cyan', 'green', 'teal', 'deep-orange', 'indigo', 'red', 'pink']

export default {
  data () {
    return {
      hashtags: [],
      items: ['javascript', 'cypressio']
    }
  },

  computed: mapState([ 'tweets' ]),

  methods: {
    remove (item) {
      this.hashtags.splice(this.hashtags.indexOf(item), 1)
      this.hashtags = [...this.hashtags]
    },

    getRandomColor () {
      return cardColors[Math.floor(Math.random() * cardColors.length)]
    },

    async getTweets () {
      await this.$store.dispatch('fetchTweets', this.hashtags)
    }
  }, 

  watch: {
    hashtags (hashtags) {
      if (!hashtags.length) {
        return this.$store.commit('clearTweets')
      }

      this.getTweets()
    }
  }
}
</script>