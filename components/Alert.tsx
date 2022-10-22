export default function Alert(props: any) {
  return (
    <div
      className="bg-cAlert text-white text-center rounded p-5"
      id="error_alert"
    >
      {props.message}
    </div>
  )
}