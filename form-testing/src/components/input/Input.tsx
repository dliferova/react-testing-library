import { Input } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"

export const AntDesignTextInput = (field: { field: any }) => {
  return (
    <>
      <Input size="large" type="email" {...field} />
    </>
  )
}

export const AntDesignPasswordInput = (field: { field: any }) => {
  return (
    <Input.Password
      size="large"
      iconRender={(visible) =>
        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
      }
      onChange={(e) => field.field.onChange(e)}
      {...field}
    />
  )
}
