<template>
  <div
    :class="groupClasses"
    :aria-required="required"
    :aria-invalid="computedAriaInvalid"
    class="row no-gutters flex-nowrap form-image-group"
    :role="isRadioGroup ? 'radiogroup' : 'group'"
    tabindex="-1">
    <div
      v-for="(item, idx) in options"
      :key="`${name}-${ item.value }`"
      :class="{ 'ml-2': idx > 0 }"
      class="col">
      <b-form-radio 
        :id="`${name}-${ item.value }`"
        :value="item.value"
        :disabled="item.disabled"
        :required="Boolean(name && required)"
        :name="name">
        <b-img
          :src="item.image" 
          :alt="item.text" 
          fluid />
      </b-form-radio>
    </div>
  </div>
</template>

<style lang="scss">
@import './BvFormImageGroup.scss';
</style>

<script>
import idMixin from 'bootstrap-vue/esm/mixins/id'
import formMixin from 'bootstrap-vue/esm/mixins/form'
import formOptionsMixin from 'bootstrap-vue/esm/mixins/form-options'
import formSizeMixin from 'bootstrap-vue/esm/mixins/form-size';
import formStateMixin from 'bootstrap-vue/esm/mixins/form-state';

export default {
  mixins: [idMixin, formMixin, formOptionsMixin, formSizeMixin, formStateMixin],
  model: {
    prop: 'checked',
    event: 'input'
  },
  provide() {
    return {
      bvRadioGroup: this
    }
  },
  props: {
    validated: {
      type: Boolean,
      default: false
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    stacked: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    checked: {
      type: [String, Object, Number, Boolean],
      default: null
    }
  },
  data() {
    return {
      localChecked: this.checked
    }
  },
  computed: {
    isRadioGroup() {
      return true;
    },
    inline() {
      return !this.stacked;
    },
    groupName() {
      // Checks/Radios tied to the same model must have the same name,
      // especially for ARIA accessibility.
      return this.name || this.safeId();
    },
    groupClasses() {
      return [this.validated ? "was-validated" : ''];
    },
    computedAriaInvalid: function computedAriaInvalid() {
      var ariaInvalid = this.ariaInvalid;

      if (ariaInvalid === true || ariaInvalid === 'true' || ariaInvalid === '') {
        return 'true';
      }

      return this.computedState === false ? 'true' : null;
    }
  },
  watch: {
    checked(newVal, oldVal) {
      this.localChecked = newVal;
    },
    localChecked(newVal, oldVal) {
      this.$emit('input', newVal);
    }
  }
}
</script>
