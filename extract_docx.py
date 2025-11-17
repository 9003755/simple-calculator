# -*- coding: utf-8 -*-
"""
使用备用方法提取Word文档内容
"""

import zipfile
import xml.etree.ElementTree as ET
import os

def extract_text_from_docx(file_path):
    """从docx文件中提取文本"""
    try:
        with zipfile.ZipFile(file_path, 'r') as zip_file:
            # 读取document.xml
            xml_content = zip_file.read('word/document.xml')
            
            # 解析XML
            root = ET.fromstring(xml_content)
            
            # 提取所有文本
            texts = []
            for elem in root.iter():
                if elem.tag.endswith('}t'):  # 文本元素
                    if elem.text:
                        texts.append(elem.text)
            
            return texts
            
    except Exception as e:
        return [f"提取文本时出错: {str(e)}"]

# 读取文档
file_path = r"d:\Ai编程学习\三角函数计算器\多功能计算器软件需求文档（SRD）.docx"

if os.path.exists(file_path):
    content = extract_text_from_docx(file_path)
    
    print("=== 多功能计算器软件需求文档内容提取结果 ===")
    print(f"共提取到 {len(content)} 段文本")
    print("\n")
    
    # 将提取的内容合并成有意义的段落
    full_text = " ".join(content)
    
    # 按常见的中文标点符号分割
    sentences = []
    current_sentence = ""
    
    for text in content:
        current_sentence += text
        if any(punct in text for punct in ['。', '！', '？', '；', '\n']):
            if current_sentence.strip():
                sentences.append(current_sentence.strip())
                current_sentence = ""
    
    if current_sentence.strip():
        sentences.append(current_sentence.strip())
    
    print("=== 格式化后的内容 ===")
    for i, sentence in enumerate(sentences[:30], 1):
        print(f"{i}. {sentence}")
    
    if len(sentences) > 30:
        print(f"\n... 还有 {len(sentences) - 30} 段内容未显示")
    
    # 保存到文件
    with open("extracted_content.txt", "w", encoding="utf-8") as f:
        f.write("=== 多功能计算器软件需求文档内容 ===\n")
        f.write(f"共提取到 {len(content)} 段文本\n\n")
        for i, sentence in enumerate(sentences, 1):
            f.write(f"{i}. {sentence}\n")
    
    print(f"\n完整内容已保存到 extracted_content.txt")
    
else:
    print(f"文件不存在: {file_path}")