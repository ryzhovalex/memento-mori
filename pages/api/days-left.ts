// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getDaysLeft from '../../core/getDaysLeft'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let birthTime: number
  let deadAge: number | undefined

  switch(req.method) {
    case "POST":
      if (typeof req.body.birthTime !== undefined) {
        if (typeof req.body.birthTime === "number") {
          birthTime = req.body.birthTime
        } else {
          res.status(404).json({
            "type": "Error",
            "message": "Value birthTime should have number type"
          })
          break;
        }
      } else {
        res.status(400).json({
          "type": "Error", "message": "Specify correct birthTime field"
        })
        break
      }

      if (typeof req.body.deadAge !== undefined) {
        if (typeof req.body.deadAge === "number") {
          deadAge = req.body.deadAge
        } else {
          res.status(404).json({
            "type": "Error",
            "message": "Field deadAge should have number type"
          })
          break;
        }
      } else {
        deadAge = undefined
      }

      try {
        const daysLeft: number = getDaysLeft(birthTime, deadAge)
        res.status(200).json({"daysLeft": daysLeft})
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({
            "message": error.message,
            "type": "Error"
          })
        } else {
          res.status(500).json({
            "message": "Unrecognized catched error type",
            "type": "Error"
          })
        }
      } finally {
        break
      }
    default:
      res.status(405).json({"message": "Method not allowed", "type": "Error"})
  }
}
