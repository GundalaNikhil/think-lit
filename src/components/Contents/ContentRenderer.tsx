"use client";

interface ContentItem {
  type: string;
  level?: number;
  format?: string;
  children?: Array<{ text?: string; children?: Array<{ text?: string }> }>;
}

interface ContentRendererProps {
  contentArray: ContentItem[];
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ contentArray }) => {
  if (!Array.isArray(contentArray)) return null;

  return (
    <>
      {contentArray.map((item, index) => {
        switch (item.type) {
          case "heading":
            if (item.level === 1) {
              return (
                <h1
                  key={index}
                  className="font-black text-gray-900 mb-8 font-['Space_Grotesk'] animate-fadeInUp text-5xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.children?.[0]?.text || ""}
                </h1>
              );
            } else if (item.level === 2) {
              return (
                <h2
                  key={index}
                  className="font-black text-gray-900 mb-8 font-['Space_Grotesk'] animate-fadeInUp text-4xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.children?.[0]?.text || ""}
                </h2>
              );
            } else if (item.level === 3) {
              return (
                <h3
                  key={index}
                  className="font-black text-gray-900 mb-8 font-['Space_Grotesk'] animate-fadeInUp text-3xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.children?.[0]?.text || ""}
                </h3>
              );
            } else {
              return (
                <h4
                  key={index}
                  className="font-black text-gray-900 mb-8 font-['Space_Grotesk'] animate-fadeInUp text-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.children?.[0]?.text || ""}
                </h4>
              );
            }

          case "paragraph":
            return (
              <p
                key={index}
                className="text-gray-700 mb-8 leading-relaxed text-lg font-['Inter'] animate-fadeInUp hover:text-gray-900 transition-colors duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.children?.[0]?.text || ""}
              </p>
            );

          case "list":
            if (item.format === "ordered") {
              return (
                <ol
                  key={index}
                  className="mb-8 ml-6 space-y-4 animate-fadeInUp list-decimal"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.children?.map((listItem, listIndex) => (
                    <li
                      key={listIndex}
                      className="text-gray-700 text-lg font-['Inter'] hover:text-gray-900 transition-colors duration-300 hover:translate-x-2 transform"
                    >
                      {listItem.children?.[0]?.text || ""}
                    </li>
                  ))}
                </ol>
              );
            } else {
              return (
                <ul
                  key={index}
                  className="mb-8 ml-6 space-y-4 animate-fadeInUp list-disc"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.children?.map((listItem, listIndex) => (
                    <li
                      key={listIndex}
                      className="text-gray-700 text-lg font-['Inter'] hover:text-gray-900 transition-colors duration-300 hover:translate-x-2 transform"
                    >
                      {listItem.children?.[0]?.text || ""}
                    </li>
                  ))}
                </ul>
              );
            }

          default:
            return null;
        }
      })}
    </>
  );
};

export default ContentRenderer;
