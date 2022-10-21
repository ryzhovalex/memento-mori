export default function DaysLeftComponent() {
  return (
    <div className='
      w-full h-full flex justify-center flex flex-col items-center bg-c30 p-3
      rounded text-2xl
    '>
      {/* Input */}
      <form action="/api/days-left" method="post" className="flex flex-col">
        <label htmlFor="currentAge" className="mb-2">
          Current age:
        </label>
        <input
          type="number" name="currentAge" id="currentAge" required
          min="1" max="90"
        />

        <label htmlFor="deadAge" className="mt-5 mb-2">
          Dead age:
        </label>
        <input type="number" name="deadAge" id="deadAge" value="90" />
      </form>

      <hr className="h-3 w-full mt-12 mb-3" />

      {/* Output */}
      <div className="text-8xl">24090</div>
    </div>
  )
}