# pyrefly: ignore [missing-import]
import fitz
import os

pdf_files = ['1.pdf', '2.pdf', '3.pdf', '4.pdf']

for pdf_file in pdf_files:
    if os.path.exists(pdf_file):
        try:
            doc = fitz.open(pdf_file)
            page = doc.load_page(0) # First page
            # Use high resolution for better quality
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
            
            # Save as jpg
            jpg_file = pdf_file.replace('.pdf', '.jpg')
            pix.save(jpg_file)
            print(f"Successfully generated {jpg_file} from {pdf_file}")
            doc.close()
        except Exception as e:
            print(f"Error processing {pdf_file}: {e}")
    else:
        print(f"File {pdf_file} not found.")
