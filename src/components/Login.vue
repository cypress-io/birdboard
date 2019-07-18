<template>
  <v-container fluid fill-height>
    <v-layout row align-center justify-center>
      <v-flex xs8 sm8 md5>
      <v-card>
        <v-toolbar color="blue">
          <v-toolbar-title>
            <v-icon large color="white">cloud</v-icon>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon color="white">help_outline</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              prepend-icon="email"
              label="Email"
              type="email"
              name="email"
            >
            </v-text-field>
            <v-text-field
              v-model="password"
              prepend-icon="vpn_key"
              label="Password"
              type="password"
              name="password"
            >
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn id="login-button" @click="login" large block color="success">
            Login
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn block flat color="primary">Forgot password?</v-btn>
        </v-card-actions>
        
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    async login () {
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        })

        this.$router.push('/board')
      } catch(error) {
        console.log(error)
      }
    }
  }
}
</script>