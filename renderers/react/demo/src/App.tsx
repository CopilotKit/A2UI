import React, { useEffect, useState } from 'react';
import { useA2UI, A2UIRenderer } from '@a2ui/react';
import { injectStyles } from '@a2ui/react/styles';
import type { Types } from '@a2ui/lit/0.8';
import { samples } from './samples';
import './index.css';

// Inject Lit structural styles on load
injectStyles();

// Demo section wrapper
function DemoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="demo-section">
      <h2 className="demo-title">{title}</h2>
      {children}
    </div>
  );
}

// Demo item wrapper
function DemoItem({
  label,
  surfaceId,
}: {
  label: string;
  surfaceId: string;
}) {
  return (
    <div className="demo-item">
      <div className="demo-item-label">{label}</div>
      <div>
        <A2UIRenderer surfaceId={surfaceId} fallback={<span style={{ color: '#94a3b8' }}>Loading...</span>} />
      </div>
    </div>
  );
}

function App() {
  const { processMessages } = useA2UI();
  const [ready, setReady] = useState(false);

  // Process all sample messages once on mount
  useEffect(() => {
    // Collect all messages from all samples
    const allMessages: Types.ServerToClientMessage[] = [];

    Object.values(samples).forEach((sample) => {
      allMessages.push(...sample.messages);
    });

    console.log(`Processing ${allMessages.length} messages for ${Object.keys(samples).length} samples`);
    processMessages(allMessages);
    setReady(true);
  }, [processMessages]);

  if (!ready) {
    return (
      <div className="demo-loading">
        <p>Loading components...</p>
      </div>
    );
  }

  return (
    <div className="demo-container">
      <div className="demo-content">
        {/* Header */}
        <div className="demo-header">
          <h1>A2UI React Renderer Demo</h1>
          <p>Component gallery showcasing all A2UI components with the Lit theme.</p>
        </div>

        {/* Text Components */}
        <DemoSection title="Text Components">
          <div className="demo-space-y">
            <DemoItem label="Basic Text" surfaceId={samples.textBasic.surfaceId} />
            <DemoItem label="Heading 1" surfaceId={samples.textH1.surfaceId} />
            <DemoItem label="Heading 2" surfaceId={samples.textH2.surfaceId} />
            <DemoItem label="Caption" surfaceId={samples.textCaption.surfaceId} />
            <DemoItem label="Markdown Support" surfaceId={samples.textMarkdown.surfaceId} />
          </div>
        </DemoSection>

        {/* Buttons */}
        <DemoSection title="Buttons">
          <div className="demo-grid">
            <DemoItem label="Primary Button" surfaceId={samples.buttonPrimary.surfaceId} />
            <DemoItem label="Secondary Button" surfaceId={samples.buttonSecondary.surfaceId} />
            <DemoItem label="Disabled Button" surfaceId={samples.buttonDisabled.surfaceId} />
          </div>
        </DemoSection>

        {/* Icons */}
        <DemoSection title="Icons (Material Symbols)">
          <div className="demo-grid">
            <DemoItem label="Home" surfaceId={samples.iconHome.surfaceId} />
            <DemoItem label="Search" surfaceId={samples.iconSearch.surfaceId} />
            <DemoItem label="Settings" surfaceId={samples.iconSettings.surfaceId} />
            <DemoItem label="Favorite" surfaceId={samples.iconFavorite.surfaceId} />
          </div>
        </DemoSection>

        {/* Image */}
        <DemoSection title="Image">
          <DemoItem label="Basic Image" surfaceId={samples.image.surfaceId} />
        </DemoSection>

        {/* Form Elements */}
        <DemoSection title="Form Elements">
          <div className="demo-grid">
            <DemoItem label="Text Field" surfaceId={samples.textFieldBasic.surfaceId} />
            <DemoItem label="Number Field" surfaceId={samples.textFieldNumber.surfaceId} />
            <DemoItem label="Long Text (Textarea)" surfaceId={samples.textFieldLongText.surfaceId} />
            <DemoItem label="Checkbox (Unchecked)" surfaceId={samples.checkbox.surfaceId} />
            <DemoItem label="Checkbox (Checked)" surfaceId={samples.checkboxChecked.surfaceId} />
            <DemoItem label="Slider" surfaceId={samples.slider.surfaceId} />
            <DemoItem label="Multiple Choice" surfaceId={samples.multipleChoice.surfaceId} />
            <DemoItem label="Date Input" surfaceId={samples.dateTime.surfaceId} />
          </div>
        </DemoSection>

        {/* Layout Components */}
        <DemoSection title="Layout Components">
          <div className="demo-space-y">
            <DemoItem label="Row Layout (Icons)" surfaceId={samples.row.surfaceId} />
            <DemoItem label="Column Layout" surfaceId={samples.column.surfaceId} />
          </div>
        </DemoSection>

        {/* Card */}
        <DemoSection title="Card">
          <DemoItem label="Card with Content" surfaceId={samples.card.surfaceId} />
        </DemoSection>

        {/* Dividers */}
        <DemoSection title="Dividers">
          <div className="demo-grid">
            <div className="demo-item">
              <div className="demo-item-label">Horizontal Divider</div>
              <div style={{ height: '5rem', display: 'flex', alignItems: 'center' }}>
                <A2UIRenderer surfaceId={samples.dividerHorizontal.surfaceId} />
              </div>
            </div>
            <div className="demo-item">
              <div className="demo-item-label">Vertical Divider</div>
              <div style={{ height: '5rem' }} className="demo-flex-center">
                <A2UIRenderer surfaceId={samples.dividerVertical.surfaceId} />
              </div>
            </div>
          </div>
        </DemoSection>

        {/* Footer */}
        <div className="demo-footer">
          <p>A2UI React Renderer v0.8.0 | Using Lit Theme</p>
        </div>
      </div>
    </div>
  );
}

export default App;
