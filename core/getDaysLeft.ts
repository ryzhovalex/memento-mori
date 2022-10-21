import ShouldHaveDiedError from "./ShouldHaveDiedError"

/**
 * Returns days left.
 * 
 * @param birthTime time of birth
 * @param deadAge the age expect to dead. Defaults to 90
 * @return numbers of days you left
 */
export default function getDaysLeft(
  birthTime: number, deadAge?: number
): number {
  console.log("Calculate")
  deadAge = deadAge !== undefined ? deadAge : 90

  let birthDate: Date = new Date(birthTime * 1000)
  let currentDate: Date = new Date()

  // Discard time factor to get correct day difference on subtracting
  birthDate.setUTCHours(0)
  birthDate.setUTCMinutes(0)
  birthDate.setUTCSeconds(0)
  birthDate.setUTCMilliseconds(0)
  currentDate.setUTCHours(0)
  currentDate.setUTCMinutes(0)
  currentDate.setUTCSeconds(0)
  currentDate.setUTCMilliseconds(0)

  // Imagine situation when person dies right at acquiring their dead age -
  // i.e. on birthday
  let deadDate: Date = new Date(
    birthDate.getUTCFullYear() + deadAge,
    birthDate.getUTCMonth(),
    birthDate.getUTCDate(),
    birthDate.getUTCHours(),
    birthDate.getMinutes(),
    birthDate.getUTCSeconds()
  )

  // Discard dead date normalized time value to get correct days difference
  // deadDate.setUTCHours(0)
  // deadDate.setUTCMinutes(0)
  deadDate.setUTCSeconds(1)
  // deadDate.setUTCMilliseconds(0)

  console.log(birthDate.toUTCString())
  console.log(deadDate.toUTCString())
  console.log(currentDate.toUTCString())

  // Also add +1 days to count birthday itself
  let daysDiff: number = Math.ceil(
    (deadDate.getTime() - currentDate.getTime()) / 1000 / 3600 / 24
  ) + 1

  if (daysDiff > 0) {
    return daysDiff;
  } else {
    throw new ShouldHaveDiedError(
      `You should have died ${Math.abs(daysDiff)} days ago.`
      + " Not sure that it's true"
    )
  }

}