import {editor} from "./editor.mjs";
import {traversal} from "./traversal.mjs";
import {debugging,density,workload,quiz} from "./experiments.mjs";
import {on} from "./ui.mjs";
const debuggerUI=traversal();
const graphUI=editor(g=>{debuggerUI.update(g);workload(g)});
debugging();density();quiz();debuggerUI.run();
on("density-run","click",density);
on("workload-run","click",()=>workload(graphUI.get()));
