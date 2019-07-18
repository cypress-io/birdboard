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
            <v-text-field
              v-model="confirmPassword"
              prepend-icon="vpn_key"
              label="Confirm Password"
              type="password"
              name="confirm-password"
            >
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn large block color="primary"
            id="signup-button"
            @click="signup"
           >
            Signup
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn block flat color="primary">Login</v-btn>
        </v-card-actions>
        
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, sameAs,  minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Signup',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },

  methods: {
    async signup () {
      console.log('signup')
      try {
        // Signup user 
        await this.$store.dispatch('signup', {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        })

        // Route user login page
        this.$router.push('/login')
      } catch(error) {
        console.log(error)
      }
    }
  },

  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength('8')
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  }
}
</script>

