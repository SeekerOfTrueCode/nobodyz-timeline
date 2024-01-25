<script setup lang="ts">
import { ref } from "vue";
import { NTimeline } from "./index";

const items = ref([
  {
    title: "Fan Study",
    subtitle: "Spotify for Artists",
    text: "Data-driven insights to help musical artists connect with fans around the world.",
  },
  {
    title: "Ikon Pass Destinations",
    subtitle: "Ikon Pass",
    text: "Explore the worldwide destinations on the Ikon Pass with a new web-based experience.",
  },
  {
    title: "GlobeKit",
    subtitle: "",
    text: "GlobeKit brings beautiful, interactive globes to the web, and it needed a unique site to show off what it's capable of.",
  },
  {
    title: "Ikon AR Maps",
    subtitle: "Ikon Pass",
    text: "Website and native iOS AR Quick Look experience for 50 Ikon Pass ski resorts across the World.",
  },
  {
    title: "Experience Center",
    subtitle: "Toyota Connected",
    text: "Proposed concepts for an installation in Toyota North America's headquarters in Plano, Texas.",
  },
  {
    title: "Even",
    subtitle: "",
    text: "Even is helping break the paycheck-to-paycheck cycle, and they deserved a website that would show off their financial wellness platform.",
  },
  {
    title: "Boundary Supply",
    subtitle: "",
    text: "The primary e-commerce destination for Boundary Supply's line of innovative and sustainable packs and apparel.",
  },
  {
    title: "Jaybird",
    subtitle: "",
    text: "E-commerce site for Jaybird, a local Utah based company specializing in performance sport headphones.",
  },
  {
    title: "In-Car Navigation",
    subtitle: "Mapbox",
    text: "Helping Mapbox define the future of turn-by-turn navigation.",
  },
  {
    title: "Tactical Mapping",
    subtitle: "New Tactics In Human Rights",
    text: "A web-based app that allows teams to track human rights violations and determine intervention points.",
  },
  {
    title: "Inside Design",
    subtitle: "InVision",
    text: "Building a platform to help inspire and empower the design community.",
  },
  {
    title: "YouMap",
    subtitle: "",
    text: "A social mapping app for iOS - connecting you to the world around you.",
  },
  {
    title: "Chat",
    subtitle: "Nike",
    text: "A uniquely Nike chat experience connecting customers with experts through the Nike+ App.",
  },
  {
    title: "Franklin Square",
    subtitle: "",
    text: "Designing an all-inclusive mobile tool for financial investors to efficiently manage their accounts.",
  },
  {
    title: "SNKRS",
    subtitle: "Nike",
    text: "Evolving the SNKRS app, making it the ultimate sneaker destination",
  },
  {
    title: "Fox Sports",
    subtitle: "",
    text: "A progressive broadcast graphics package for the NFL on Fox Sports.",
  },
  {
    title: "Stance",
    subtitle: "",
    text: "An e-commerce site seamlessly designed to embrace the uncommon thread.",
  },
  {
    title: "Global Payments",
    subtitle: "Paypal",
    text: "An interactive installation mapping the billions of transactions Paypal processes in a day.",
  },
  {
    title: "Luxe Valet",
    subtitle: "",
    text: "Reimagining a mobile experience for Luxe Valet by designing and building a native prototype.",
  },
  {
    title: "Epicurrence",
    subtitle: "",
    text: "Crafting the site for Epicurrence 3 in our own backyard - Park City.",
  },
  {
    title: "Boston Globe",
    subtitle: "",
    text: "Concepting the next evolution of sports analysis for Boston Globe.",
  },
  {
    title: "Genworth",
    subtitle: "",
    text: "An interactive data visualization showcasing the long-term cost of health care.",
  },
  {
    title: "World Atlas",
    subtitle: "National Geographic",
    text: "An immersive iOS app fostering exploration and education around the world.",
  },
  {
    title: "ESPN FC",
    subtitle: "ESPN",
    text: "Collaborating with ESPN to design and build espnfc.com for the 2014 World Cup.",
  },
  {
    title: "Merchant App",
    subtitle: "PayPal",
    text: "Rethinking how small businesses can use Paypal's merchant app more efficiently.",
  },
  {
    title: "City Guides",
    subtitle: "National Geographic",
    text: "Everything you need to know about the places you don’t know - at your fingertips on iOS.",
  },
  {
    title: "National Parks",
    subtitle: "National Geographic",
    text: "The little big idea of branding the National Parks led to an Apple Design Award winning iOS app.",
  },
]);

const loremIpsum = `Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?
[33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`;
</script>

<template>
  <span class="ipsum">{{ loremIpsum }}</span>
  <NTimeline :transitionTimeMs="200" :items="items">
    <!-- <template #label="{ label, title, subtitle, text }">
      {{ label }}
    </template> -->
    <template #item="{ title, subtitle, text }">
      <div>
        <h2>{{ title }}</h2>
        <h3>{{ subtitle }}</h3>
        <p>{{ text }}</p>
      </div>
    </template>
  </NTimeline>
  <span class="ipsum">{{ loremIpsum }}</span>
</template>

<style scoped>
.ipsum {
  display: block;
  margin: 0 5rem;
  font-size: 2rem;
}
</style>
