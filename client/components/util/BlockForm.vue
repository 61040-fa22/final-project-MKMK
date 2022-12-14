<template>
  <form @submit.prevent="submit">
    <h3>{{ title }}</h3>
    <article v-if="fields.length">
      <div
        v-for="field in fields"
        :key="field.id"
      >
        <label :for="field.id">{{ field.label ? field.label + ":" : '' }}</label>
        <textarea
          v-if="field.type === 'textarea'"
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        />
        <input
          v-else-if="field.type === 'password'"
          type="password"
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        >
        <input
          v-else-if="field.type === 'date'"
          type="date"
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        >
        <!--Default to text input-->
        <input
          v-else
          type="text"
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        >
      </div>
    </article>
    <article v-else>
      <p>{{ content }}</p>
    </article>
    <article v-if="hasImage">
      <div>
        <div>
          <button type="button" class='photo' @click="click1">Add a Photo</button>
          <input type="file" ref="input1" 
           style="display: none"
           @change="previewImage" accept="image/*" >                
        </div>
  
        <div v-if="imageData!=null">                     
           <img class="preview" height="268" width="356" :src="imgRef">
          <br>
        </div>  
        <br><br> 
      </div>
    </article>
    <div>
      <button
        type="submit"
        class="button submit_button"
      >
        {{ buttonLabel || title }}
      </button>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </form>
</template>

<script>
import firebase from 'firebase/compat/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
export default {
  name: 'BlockForm',
  data() {
    /**
     * Options for submitting this form.
     */
    return {
      url: '', // Url to submit form to
      method: 'GET', // Form request method
      hasBody: false, // Whether or not form request has a body
      body: {},
      hasImage: false, // Whether or not the form has an image upload
      imgRef: '',
      imageData: null, 
      alerts: {}, // Displays success/error messages encountered during form submission
      callback: null, // Function to run after successful form submission

      setUsername: false, // Whether or not stored username should be updated after form submission
      refreshEntries: false // Whether or not stored entries should be updated after form submission
    };
  },
  methods: {
    create () {
        
        const post = {
          photo: this.imgRef,        
        }
        firebase.database().ref('PhotoGallery').push(post)
        .then((response) => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
      },
    click1() {
    this.$refs.input1.click()   
  },
  previewImage(event) {
    this.uploadValue=0;
    this.imgRef=null;
    this.imageData = event.target.files[0];
    this.onUpload()
  },
  async onUpload(){
    this.imgRef=null;
    console.log(this.imageData.name);
    const storage = getStorage();
    const storageRef= ref(storage, this.imageData.name);
    uploadBytes(storageRef, this.imageData).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    });
    await getDownloadURL(storageRef).then(url => {
      console.log('Download URL', url)
      this.imgRef = url;
    });
  },
    async submit() {
      /**
       * Submits a form with the specified options from data().
       */
      const options = {
        method: this.method,
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin'
      };
      if (this.hasBody) {
        const formData = Object.fromEntries(
          this.fields.map(field => {
            const {id, value} = field;
            field.value = '';
            return [id, value];
          })
        );

        const toStringify = {...formData, ...this.requestBody};

        if (this.hasImage) {
          toStringify["imageRef"] = this.imgRef;
        }

        // Add onto existing body
        options.body = JSON.stringify(toStringify);
      }


      try {
        const r = await fetch(this.url, options);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        if (this.setUsername) {
          this.$store.commit('setUsername', res?.user?.username);
        }
        if (this.refreshEntries) {
          this.$store.commit('refreshEntries');
        }
        if (this.callback) {
          this.callback(res);
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 14px;
  position: relative;
}

article > div {
  display: flex;
  flex-direction: column;
}

form > article p {
  margin: 0;
}

form h3,
form > * {
  margin: 0.3em 0;
}

form h3 {
  margin-top: 0;
}

textarea {
   font-family: inherit;
   font-size: inherit;
}

.photo {
  border-style: solid;
  border-color: black;
  border-radius: 5px;
  padding: 3px;
}
</style>
