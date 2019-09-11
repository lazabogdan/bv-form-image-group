(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('bootstrap-vue/esm/mixins/id'), require('bootstrap-vue/esm/mixins/form'), require('bootstrap-vue/esm/mixins/form-options'), require('bootstrap-vue/esm/mixins/form-size'), require('bootstrap-vue/esm/mixins/form-state')) :
  typeof define === 'function' && define.amd ? define(['exports', 'bootstrap-vue/esm/mixins/id', 'bootstrap-vue/esm/mixins/form', 'bootstrap-vue/esm/mixins/form-options', 'bootstrap-vue/esm/mixins/form-size', 'bootstrap-vue/esm/mixins/form-state'], factory) :
  (global = global || self, factory(global.BvFormImageGroup = {}, global.idMixin, global.formMixin, global.formOptionsMixin, global.formSizeMixin, global.formStateMixin));
}(this, function (exports, idMixin, formMixin, formOptionsMixin, formSizeMixin, formStateMixin) { 'use strict';

  idMixin = idMixin && idMixin.hasOwnProperty('default') ? idMixin['default'] : idMixin;
  formMixin = formMixin && formMixin.hasOwnProperty('default') ? formMixin['default'] : formMixin;
  formOptionsMixin = formOptionsMixin && formOptionsMixin.hasOwnProperty('default') ? formOptionsMixin['default'] : formOptionsMixin;
  formSizeMixin = formSizeMixin && formSizeMixin.hasOwnProperty('default') ? formSizeMixin['default'] : formSizeMixin;
  formStateMixin = formStateMixin && formStateMixin.hasOwnProperty('default') ? formStateMixin['default'] : formStateMixin;

  //

  var script = {
    mixins: [idMixin, formMixin, formOptionsMixin, formSizeMixin, formStateMixin],
    model: {
      prop: 'checked',
      event: 'input'
    },
    provide: function provide() {
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
    data: function data() {
      return {
        localChecked: this.checked
      }
    },
    computed: {
      isRadioGroup: function isRadioGroup() {
        return true;
      },
      inline: function inline() {
        return !this.stacked;
      },
      groupName: function groupName() {
        // Checks/Radios tied to the same model must have the same name,
        // especially for ARIA accessibility.
        return this.name || this.safeId();
      },
      groupClasses: function groupClasses() {
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
      checked: function checked(newVal, oldVal) {
        this.localChecked = newVal;
      },
      localChecked: function localChecked(newVal, oldVal) {
        this.$emit('input', newVal);
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  /* script */
  var __vue_script__ = script;
  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row no-gutters flex-nowrap form-image-group",class:_vm.groupClasses,attrs:{"aria-required":_vm.required,"aria-invalid":_vm.computedAriaInvalid,"role":_vm.isRadioGroup ? 'radiogroup' : 'group',"tabindex":"-1"}},_vm._l((_vm.options),function(item,idx){return _c('div',{key:(_vm.name + "-" + (item.value)),staticClass:"col",class:{ 'ml-2': idx > 0 }},[_c('b-form-radio',{attrs:{"id":(_vm.name + "-" + (item.value)),"value":item.value,"disabled":item.disabled,"required":Boolean(_vm.name && _vm.required),"name":_vm.name}},[_c('b-img',{attrs:{"src":item.image,"alt":item.text,"fluid":""}})],1)],1)}),0)};
  var __vue_staticRenderFns__ = [];

    /* style */
    var __vue_inject_styles__ = undefined;
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var BvFormImageGroup = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  exports.BvFormImageGroup = BvFormImageGroup;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
