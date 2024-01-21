<script setup lang="ts">
import { ref } from "vue";
import { NTimeline } from "./index";

const items = ref([
  {
    label: "F",

    title: "Fan Study",
    subtitle: "Spotify for Artists",
    text: "Data-driven insights to help musical artists connect with fans around the world.",
  },
  {
    label: "I",

    title: "Ikon Pass Destinations",
    subtitle: "Ikon Pass",
    text: "Explore the worldwide destinations on the Ikon Pass with a new web-based experience.",
  },
  {
    label: "G",

    title: "GlobeKit",
    subtitle: "",
    text: "GlobeKit brings beautiful, interactive globes to the web, and it needed a unique site to show off what it's capable of.",
  },
  {
    label: "I",

    title: "Ikon AR Maps",
    subtitle: "Ikon Pass",
    text: "Website and native iOS AR Quick Look experience for 50 Ikon Pass ski resorts across the World.",
  },
  {
    label: "E",

    title: "Experience Center",
    subtitle: "Toyota Connected",
    text: "Proposed concepts for an installation in Toyota North America's headquarters in Plano, Texas."
  },
  {
    label: "E",

    title: "Even",
    subtitle: "",
    text: "Even is helping break the paycheck-to-paycheck cycle, and they deserved a website that would show off their financial wellness platform."
  },
  {
    label: "B",

    title: "Boundary Supply",
    subtitle: "",
    text: "The primary e-commerce destination for Boundary Supply's line of innovative and sustainable packs and apparel."
  },
  {
    label: "J",
  
    title: "Jaybird",
    subtitle: "",
    text: "E-commerce site for Jaybird, a local Utah based company specializing in performance sport headphones."
  },
  {
    label: "I",

    title: "In-Car Navigation",
    subtitle: "Mapbox",
    text: "Helping Mapbox define the future of turn-by-turn navigation."
  },
  {
    label: "T",

    title: "Tactical Mapping",
    subtitle: "New Tactics In Human Rights",
    text: "A web-based app that allows teams to track human rights violations and determine intervention points."
  },
  {
    label: "I",

    title: "Inside Design",
    subtitle: "InVision",
    text: "Building a platform to help inspire and empower the design community."
  },
  {
    label: "Y",

    title: "YouMap",
    subtitle: "",
    text: "A social mapping app for iOS - connecting you to the world around you."
  },
  {
    label: "C",

    title: "Chat",
    subtitle: "Nike",
    text: "A uniquely Nike chat experience connecting customers with experts through the Nike+ App."
  },
  {
    label: "F",

    title: "Franklin Square",
    subtitle: "",
    text: "Designing an all-inclusive mobile tool for financial investors to efficiently manage their accounts."
  },
  {
    label: "S",

    title: "SNKRS",
    subtitle: "Nike",
    text: "Evolving the SNKRS app, making it the ultimate sneaker destination"
  },
  {
    label: "F",

    title: "Fox Sports",
    subtitle: "",
    text: "A progressive broadcast graphics package for the NFL on Fox Sports."
  },
  {
    label: "S",

    title: "Stance",
    subtitle: "",
    text: "An e-commerce site seamlessly designed to embrace the uncommon thread."
  },
  {
    label: "G",

    title: "Global Payments",
    subtitle: "Paypal",
    text: "An interactive installation mapping the billions of transactions Paypal processes in a day."
  },
  {
    label: "L",

    title: "Luxe Valet",
    subtitle: "",
    text: "Reimagining a mobile experience for Luxe Valet by designing and building a native prototype."
  },
  {
    label: "E",

    title: "Epicurrence",
    subtitle: "",
    text: "Crafting the site for Epicurrence 3 in our own backyard - Park City."
  },
  {
    label: "B",

    title: "Boston Globe",
    subtitle: "",
    text: "Concepting the next evolution of sports analysis for Boston Globe."
  },
  {
    label: "G",

    title: "Genworth",
    subtitle: "",
    text: "An interactive data visualization showcasing the long-term cost of health care."
  },
  {
    label: "W",

    title: "World Atlas",
    subtitle: "National Geographic",
    text: "An immersive iOS app fostering exploration and education around the world."
  },
  {
    label: "E",

    title: "ESPN FC",
    subtitle: "ESPN",
    text: "Collaborating with ESPN to design and build espnfc.com for the 2014 World Cup."
  },
  {
    label: "M",

    title: "Merchant App",
    subtitle: "PayPal",
    text: "Rethinking how small businesses can use Paypal's merchant app more efficiently."
  },
  {
    label: "C",

    title: "City Guides",
    subtitle: "National Geographic",
    text: "Everything you need to know about the places you don’t know - at your fingertips on iOS."
  },
  {
    label: "N",

    title: "National Parks",
    subtitle: "National Geographic",
    text: "The little big idea of branding the National Parks led to an Apple Design Award winning iOS app."
  }
]);
</script>

<template>
  <NTimeline :items="items">
    <template #item="{ title, subtitle, text }">
      <div>
        <h2>{{ title }}</h2>
        <h3>{{ subtitle }}</h3>
        <p>{{ text }}</p>
      </div>
    </template>
  </NTimeline>
</template>

<style scoped></style>

<ul id="pages">
            
</ul>