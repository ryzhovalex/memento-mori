import React, { useEffect, useState } from "react"
import Alert from "./Alert"

export default function DaysLeftComponent() {
  const [alerts, setAlerts] = useState<JSX.Element[]>([])

  useEffect(() => {
    // Schedule to remove earliest alert. Called after adding an alert.
    // Alert array checking branch should be included, to not fall in recursion
    // loop
    if (alerts.length !== 0) {
      const timer: NodeJS.Timeout = setTimeout(() => {
        setAlerts(alerts.slice(1))
      }, 5000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [alerts])  // Run only if alerts has been changed

  function showErrorAlert(message: string) {
    const alert: JSX.Element = <Alert
      message={message}
      key={Math.random()}
    />

    // Clear days display on any error occured
    const daysLeftElement: HTMLElement | null =
      document.getElementById("days_left")
    if (daysLeftElement) 
      daysLeftElement.innerText = ""

    // Add alert
    setAlerts([...alerts, alert]) 
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const route: string = "/api/days-left"
    const target: any = event.target

    const data: string = JSON.stringify({
      birthTime: new Date(target.birthDate.value).getTime() / 1000,
      deadAge: parseInt(target.deadAge.value)
    })

    const options: any = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    }  

    const response: Response = await fetch(route, options)

    const resultJson: any = await response.json()

    let daysLeft: number

    if (typeof resultJson.daysLeft === "number") {
      daysLeft = resultJson.daysLeft
    } else {
      if (resultJson.type === "Error") {
        showErrorAlert(resultJson.message)
      } else {
        showErrorAlert("Unrecognized json returned by server")
      }
      return
    }

    // Days left are calculated according to UTC time. Here we need to adjust
    // it to local time of the client - if client has been reached the new day
    // and:
    //  - negative from UTC, add one more day
    //  - if positive - subtract one day
    const clientDate: Date = new Date()
    if (clientDate.getDate() > clientDate.getUTCDate()) {
      daysLeft--;
    } else if (clientDate.getDate() < clientDate.getUTCDate()) {
      daysLeft++;
    }

    if (daysLeft == 0) {
      showErrorAlert("You should have died yesterday, isn't it?")
    }

    const daysLeftElement: HTMLElement | null =
      document.getElementById("days_left")
    if (daysLeftElement) {
      if (daysLeft) {
        daysLeftElement.innerText = daysLeft.toString()
      } else {
        daysLeftElement.innerText = ""
      }
    }
  }

  return (
    <div className='
      w-full h-full flex justify-center flex flex-col items-center bg-c30 p-3
      rounded text-2xl
    '>
      {/* Input */}
      <form
        method="post"
        className="flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="flex mb-5 flex-col">
          <label htmlFor="birthDate" className="mb-2">
            Birth date:
          </label>
          <input
            type="date" name="birthDate" id="birthDate" required
            className="text-black text-center"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="deadAge" className="mb-2">
            Dead age:
          </label>
          <input
            type="number"
            name="deadAge"
            id="deadAge"
            defaultValue="90"
            min="1"
            max="120" 
            className="text-black w-1/3 p-1 text-center"
          />
        </div>
        
        <button
          type="submit"
          className="
            bg-c10 mt-9 rounded hover:bg-c10Active w-3/6 self-center p-1
          "
        >
          Submit
        </button>
      </form>

      <hr className="h-3 w-full mt-12 mb-3" />

      {/* Output */}
      <div className="text-8xl" id="days_left"></div>

      {/* Alerts */}
      <div
        id="alerts"
        className="
          mt-3
          overflow-auto
          max-h-96 space-y-4 flex-col pr-3 scrollbar-thin scrollbar-thumb-c10
          scrollbar-track-c60
          scrollbar-rounded
          scrollbar-thumb-rounded-full scrollbar-track-rounded-full
        "
      >
        {alerts}
      </div>
    </div>
  )
}