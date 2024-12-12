<template>
  <div>
    <h1>{{ page.title }}</h1>
    <div v-html="pageContent"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['slug'],
  data() {
    return {
      page: {},
      pageContent: '',
      apiUrl: import.meta.env.VITE_API_URL
    };
  },
  watch: {
    slug: 'fetchPageData'
  },
  created() {
    this.fetchPageData();
  },
  methods: {
    async fetchPageData() {
      try {
        const response = await axios.get(`${this.apiUrl}/api/static-pages?filters[slug][$eq]=${this.slug}`);
        if (response.data && response.data.data && response.data.data.length > 0) {
          this.page = response.data.data[0].attributes;
          this.pageContent = this.page.content || '';
        } else {
          console.error('Data is missing in the response');
        }
      } catch (error) {
        console.error('Error fetching static page:', error);
      }
    }
  }
};
</script>