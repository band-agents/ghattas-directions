Regenerates `src/brand/logos.ts` from the brand book PDF. Needs `npm i pdfjs-dist@3.11.174` in this folder.

    node extract.cjs "<brand book>.pdf" 10 p10.svg   # option 01 lockups
    node extract.cjs "<brand book>.pdf" 12 p12.svg   # option 02
    node extract.cjs "<brand book>.pdf" 16 p16.svg   # option 03
    node gen.cjs ../../src/brand

Page numbers are 1-based and specific to `GC - Brand Elements Presentation.pdf`.
