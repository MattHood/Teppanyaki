import {AudioContext} from 'standardized-audio-context';

import Teppanyaki from './teppanyaki.js';


let audioContext = new AudioContext();

const el = document.getElementById('rach');
const track = audioContext.createMediaElementSource(el); 
var tepp = new Teppanyaki(audioContext, track);

window.Track = el;
window.Teppanyaki = tepp;
window.Params = tepp.getParameterStore();

import {Constants, 
            DefaultParameters, 
            ParameterMinimums, 
            ParameterMaximums} from './constants.js';
            
    let sliders = {
      delayMin:     document.querySelector("#delayMin"),
      delayMax:     document.querySelector("#delayMax"),
      regenMin:     document.querySelector("#regenMin"),
      regenMax:     document.querySelector("#regenMax"),
      panMin:       document.querySelector("#panMin"),      
      panMax:       document.querySelector("#panMax"),
      cutoffHP:     document.querySelector("#cutoffHP"),
      cutoffLP:     document.querySelector("#cutoffLP"),
      resonanceHP:  document.querySelector("#resonanceHP"),
      resonanceLP:  document.querySelector("#resonanceLP"),
      mix:          document.querySelector("#mix"),
      envelopeLevel:    document.querySelector("#envelopeLevel")
    };

    function setSliderParams(el, def) {
      el.min = ParameterMinimums[def];
      el.max = ParameterMaximums[def];
      el.defaultValue = DefaultParameters[def];
      el.value = DefaultParameters[def];
      el.step = (el.max - el.min) / Constants.SLIDER_STEPS;

      el.oninput = function() {
        window.Params[def] = parseFloat(el.value);
      }
    };

    function coupleSliders(lowerName, upperName) {
      let lower = sliders[lowerName];
      let upper = sliders[upperName];

      lower.oninput = function() {
        upper.value = Math.max(upper.value, lower.value);
        window.Params[lowerName] = parseFloat(lower.value);
        window.Params[upperName] = parseFloat(upper.value);
      }
      upper.oninput = function() {
        lower.value = Math.min(lower.value, upper.value);
        window.Params[lowerName] = parseFloat(lower.value);
        window.Params[upperName] = parseFloat(upper.value);
      }
    };

    for (let slider in sliders) {
      setSliderParams(sliders[slider], slider);
    }

    // The envelopeLevel slider has special behaviour, 
    // this segment overrides that which was given above.
    sliders["envelopeLevel"].step = 1;
    sliders["envelopeLevel"].oninput = function() {
      window.Params["envelopeLevel"] = parseInt(sliders["envelopeLevel"].value);
    }
    
    coupleSliders("delayMin", "delayMax");
    coupleSliders("regenMin", "regenMax");
    coupleSliders("panMin", "panMax");
    coupleSliders("cutoffHP", "cutoffLP");

    let quantize = document.querySelector("#quantize");
    quantize.min = ParameterMinimums["quantize"];
    quantize.max = ParameterMaximums["quantize"];
    quantize.defaultValue = DefaultParameters["quantize"];
    quantize.onchange = function() {
      window.Params["quantize"] = quantize.value;
    }


    let bpm = document.querySelector("#bpm");
    bpm.min = ParameterMinimums["bpm"];
    bpm.max = ParameterMaximums["bpm"];
    bpm.defaultValue = DefaultParameters["bpm"];
    bpm.onchange = function() {
      window.Params["bpm"] = bpm.value;
    }
 