<template>
  <a-form :layout="formLayout" :form="form">
    <a-form-item
      label="Form Layout"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-radio-group
        default-value="horizontal"
        @change="handleFormLayoutChange"
      >
        <a-radio-button value="horizontal"> Horizontal </a-radio-button>
        <a-radio-button value="vertical"> Vertical </a-radio-button>
        <a-radio-button value="inline"> Inline </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="Field A"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <!-- 使用 v-decorator 添加监听 -->
      <a-input
        v-decorator="[
          'fieldA',
          {
            // 使用initialValue 的初始值，和default的形式一样，只会生效一次
            initialValue: fieldA,
            //required: true 表示必填
            rules: [{ required: true, min: 6, message: '必须大于5个字符' }],
          },
        ]"
        placeholder="input placeholder"
      />
    </a-form-item>
    <a-form-item
      label="Field B"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input v-decorator="['fieldB']" placeholder="input placeholder" />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="handleSubmit"> Submit </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    // 将库中的this.$form复制到当前组件，操作数据
    this.form = this.$form.createForm(this);
    return {
      formLayout: "horizontal",
      fieldA: "hello",
      fieldB: "",
    };
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {};
    },
  },
  mounted() {
    setInterval(() => {
      // 设置值用 api的 this.form.setFieldsValue({key:value})
      this.form.setFieldsValue({
        fieldA: `hello ${Math.floor(Math.random() * 100)}`,
      });
    }, 2000);
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handleSubmit() {
      // 验证的API方法
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          // 将值合并到当前组件
          Object.assign(this, values);
        }
      });
    },
  },
};
</script>
