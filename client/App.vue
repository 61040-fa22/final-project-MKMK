<template>
  <div id="app">
    <GlobalAlerts />
    <MainMenu />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import GlobalAlerts from '@/components/common/GlobalAlerts.vue';
import FooterComponent from '@/components/common/FooterComponent.vue';
import MainMenu from '@/components/common/MainMenu.vue';

export default {
  name: 'App',
  components: {
    GlobalAlerts,
    FooterComponent,
    MainMenu
  },
  beforeCreate() {
    // Sync stored username to current session
    fetch('/api/users/session', {
      credentials: 'same-origin' // Sends express-session credentials with request
    }).then(res => res.json()).then(res => {
      const user = res.user;
      this.$store.commit('setUsername', user ? user.username : null);
    });

    // Clear alerts on page refresh
    this.$store.state.alerts = {};
  }
};
</script>

<style>
/* Global styles! */

/* Naive CSS reset (a reset is a list of CSS rules
to ensure styling consistency across browsers, which
typically have their own default styles) */
* {
  box-sizing: border-box;
  /* Resets */
  margin: 0;
  padding: 0;
  font-family: Helvetica, sans-serif;
}

/* Prevent overscrolling :) https://stackoverflow.com/questions/12046315/prevent-overscrolling-of-web-page */
html {
  overflow: hidden;
  height: 100%;
}
body {
  height: 100%;
  overflow: auto;
}

body {
  background: #fcfcfd;
  color: #232323;
  font-size: 1.1rem;
}

#app {
  width: 95%; /* Take up most of the width of a screen... */
  max-width: 64rem; /* ...but stop at a certain point if the screen is too wide */
  margin: 0 auto; /* Horizontally center */
}

aside {
  width: 100%;
  max-width: 16rem;
  position: sticky;
  top: 0;
  height: 100%;
}

main {
  width: 100%;
  padding: 2rem auto;
}

/* Wrapper to make page no wider than a specific width on large screens,
but still take up the whole width on small screens */
.page_container {
  width: 95%;
  max-width: 700px;
  margin: 0 auto;
}

.page_header {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page_content {
  margin: 0 2rem;
}

h1, h2, h3 {
  line-height: 1.3;
  margin: 0.5em 0;
}

h1 {
  font-size: 2.25rem;
}
h2 {
  font-size: 1.75rem;
}
h3 {
  font-size: 1.35rem;
}
main a {
  color: #c60;
}
/* For text-style alerts */
p.error {
  color: #c30;
}
p.success {
  color: #0c3;
}

button, .button {
  border: none;
  outline: none;
  transition: 0.1s;
  cursor: pointer;
  border-radius: 2rem;
  font-weight: bold;
}

.submit_button {
  padding: 0.7rem 1.4rem;
  font-size: 1.1rem;
  background: #f93;
  border-radius: 2rem;
  color: #fff;
}

.submit_button:hover {
  background: #ff8d1a;
}

.submit_button.danger {
  background: #c30;
}

.action_button {
  padding: 0.3rem 0.8rem;
  background: transparent;
  font-size: 0.9rem;
  border: 2px solid #f93;
  border-radius: 2rem;
  height: 100%;
}

.action_button:hover {
  color: #ff8d1a;
}

.action_button.danger {
  border-color: #c30;
}

.action_button.danger:hover {
  color: #c30;
}

.text_button {
  background: transparent;
  border: none;
  outline: none;
  padding: 0.7rem 1.4rem;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
  font-size: 1.1rem;
  font-weight: normal;
}

.text_button:hover {
  background: #ddd;
}

.null {
  margin: 2rem 0;
  text-align: center;
  color: #333;
}

hr {
  border: none;
  border-top: 1px solid #aaa;
}

input[type="text"],
input[type="password"],
input[type="date"],
textarea {
  font-size: 1.1rem;
  color: #343434;
  padding: 0.8rem 1rem;
  outline: none;
  border-radius: 0.25rem;
  border: 1px solid #aaa;
  margin: 0.25rem 0 1rem;
  max-width: 20rem;
}

input[type="text"]:focus,
input[type="password"]:focus {
  box-shadow: 0 0 4px #ccc;
}

textarea {
  max-width: 100%;
  height: 8rem;
  resize: none;
  padding: 1rem;
}

textarea:focus {
  box-shadow: 0 0 4px #ccc;
}

form label {
  padding: 0.25rem 0;
}

.alerts {
  position: absolute;
  z-index: 99;
  bottom: 0;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 10%);
  width: 100%;
  text-align: center;
}

.alerts article {
  border-radius: 5px;
  padding: 10px 20px;
  color: #fff;
}

.alerts p {
  margin: 0;
}

.alerts .error {
  background-color: rgb(166, 23, 33);
}

.alerts .success {
  background-color: rgb(45, 135, 87);
}
</style>
