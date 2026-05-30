from typing import Dict, Any

# We use direct Dict[str, Any] type hints for dynamic content to match the 
# unstructured, flexible schema-free nature of the portfolio sections.
ContentUpdate = Dict[str, Any]
