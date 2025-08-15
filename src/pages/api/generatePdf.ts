// pages/api/generatePdf.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import PDFDocument from 'pdfkit'
import { PassThrough } from 'stream'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed')
  }

  const { reportText } = req.body
  if (!reportText) {
    return res.status(400).json({ error: 'Missing report text' })
  }

  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', 'attachment; filename="ai-bureau-report.pdf"')

  const doc = new PDFDocument()
  const stream = new PassThrough()
  doc.pipe(stream)

  // Header
  doc.fontSize(20).text('AI Bureau of Unclaimed Ideas', { align: 'center' })
  doc.fontSize(12).text('Confidential – Internal Use Only', { align: 'center' })
  doc.moveDown()

  // Body
  doc.fontSize(10).text(reportText, { align: 'left' })

  doc.end()
  stream.pipe(res)
}
