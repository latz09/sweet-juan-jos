export function parseBoldSyntax(text) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g); // Split on **bold parts**
  
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold">
            {part.replace(/\*\*/g, '')}
          </strong>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  }
  