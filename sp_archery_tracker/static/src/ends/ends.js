import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";

const MEASUREMENT_UNITS = {
  METER: "m",
  FEET: "ft",
  YARDS: "yd"
}

const DEFAULT_DISTANCE = 20;

export class Ends extends Component {
  static template = "sp_archery_tracker.Ends";
  static props = {...standardFieldProps};
  setup() {
    this.state = useState({
      selectedArrow: null,
      selectedEnd: null,
      showArrowDialog: false,
      editingArrow: false,
    })
    if (!this.value || !this.value.ends){
      this.setDefault();
    }
    this.addArrow = this.addArrow.bind(this);
    this.setArrow = this.setArrow.bind(this);
    this.openArrowDialog = this.openArrowDialog.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
  }
  get value(){
    return this.props.record.data.ends;
  }
  scoreEnd(arrows) {
    return arrows.reduce(
      (sum, currentValue) => {
        let value = Number(currentValue);
        if (isNaN(value)){
          if (currentValue == "X"){
            value = 10;
          } else {
            value = 0;
          }
        }
        return sum + value
      },
      0
    )
  }
  async setDefault() {
      try {
        await this.props.record.update({ ends: { ends: [] } }, { save: true });
      }
      catch(e) {
        console.log("ERROR: Couldn't set default value");
      }
  }
  async addEnd() {
    try {
      await this.props.record.update({ ends: { ends: [...this.value.ends, { distance: 20, unit: MEASUREMENT_UNITS.YARDS, arrows: [], score: 0 }] } }, { save: true });
    } catch (e) {
      console.log("ERROR: Could not add end")
    }
  } 
  async handleDistanceChange(e, end){
    let newDistance = Number(e.target.value.trim());
    if (isNaN(newDistance) || newDistance < 1){
      newDistance = DEFAULT_DISTANCE;
    }
    e.target.style.width = (String(newDistance).length + 1) + "ch";
    try {
      const ends = JSON.parse(JSON.stringify(this.value.ends));
      ends[end].distance = newDistance;
      await this.props.record.update({ ends: { ends }}, { save: true });
    } catch (e) {
      console.log("ERROR: Could not update distance");
    }
  }
  async addArrow(arrowValue) {
    if (this.state.selectedEnd != null){
      try {
        const ends = JSON.parse(JSON.stringify(this.value.ends));
        ends[this.state.selectedEnd].arrows.push(arrowValue);
        ends[this.state.selectedEnd].score = this.scoreEnd(ends[this.state.selectedEnd].arrows);
        await this.props.record.update({ ends: { ends }}, { save: true });
        this.closeArrowDialog();
      } catch (e) {
        console.log("ERROR: Could not add arrow")
      }
    }
  }
  closeArrowDialog() {
    this.state.showArrowDialog = false;
    this.state.editingArrow = false;
    this.state.selectedArrow = null;
    this.state.selectedEnd = null;
  }
  openArrowDialog(editingArrow = false, end = null, arrow = null) {
    this.state.showArrowDialog = true;
    this.state.editingArrow = editingArrow;
    this.state.selectedArrow = arrow;
    this.state.selectedEnd = end;
  }
  async deleteArrow(){
    if (this.state.selectedEnd != null && this.state.selectedArrow != null){
      try {
        const ends = JSON.parse(JSON.stringify(this.value.ends));
        ends[this.state.selectedEnd].arrows.splice(this.state.selectedArrow, 1);
        ends[this.state.selectedEnd].score = this.scoreEnd(ends[this.state.selectedEnd].arrows);
        await this.props.record.update({ ends: { ends }}, { save: true });
        this.closeArrowDialog();
      } catch (e) {
        console.log("ERROR: Could not delete arrow");
      }
    }
  }
  async setArrow(arrowValue){
    if (this.state.selectedEnd != null && this.state.selectedArrow != null && arrowValue){
      try {
        const ends = JSON.parse(JSON.stringify(this.value.ends));
        ends[this.state.selectedEnd].arrows[this.state.selectedArrow] = arrowValue;
        ends[this.state.selectedEnd].score = this.scoreEnd(ends[this.state.selectedEnd].arrows);
        await this.props.record.update({ ends: { ends }}, { save: true });
        this.closeArrowDialog();
      } catch (e) {
        console.log("ERROR: Could not set arrow value")
      }
    }
  }
}

export const endsField = {
  component: Ends
}
registry.category("fields").add("ends", endsField);
