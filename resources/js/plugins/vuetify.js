import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import * as components from "vuetify/lib/components/index.d.ts";
// import {VSelect} from "vuetify/lib/components";
import * as directives from "vuetify/lib/directives/index.d.ts";
import { createVuetify } from "vuetify";

const vuetify = createVuetify({ components, directives });

export default vuetify;
