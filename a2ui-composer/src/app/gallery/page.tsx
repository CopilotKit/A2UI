'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GalleryWidget } from '@/components/gallery/gallery-widget';
import { WidgetPreviewModal } from '@/components/gallery/widget-preview-modal';
import { Widget } from '@/types/widget';
import { useWidgets } from '@/contexts/widgets-context';
import { ALL_GALLERY_WIDGETS } from '@/data/gallery';

export default function GalleryPage() {
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);
  const [renderer, setRenderer] = useState<'react' | 'lit'>('react');
  const { addWidget } = useWidgets();
  const router = useRouter();

  const handleOpenInEditor = async () => {
    if (!selectedWidget) return;

    // Create a new widget with a unique ID but copy the content
    const newWidget: Widget = {
      ...selectedWidget,
      id: crypto.randomUUID(),
      name: `${selectedWidget.name} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to storage
    await addWidget(newWidget);

    // Close modal and navigate to editor
    setSelectedWidget(null);
    router.push(`/widget/${newWidget.id}`);
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Gallery</h1>
        <div className="flex rounded-lg border border-border bg-white p-0.5 shadow-sm">
          {(['react', 'lit'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRenderer(r)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                renderer === r
                  ? 'bg-foreground text-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {r === 'react' ? 'React' : 'Lit'}
            </button>
          ))}
        </div>
      </div>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5" style={{ columnWidth: '308px' }}>
        {ALL_GALLERY_WIDGETS.map((item) => (
          <div key={item.widget.id} className="mb-4 break-inside-avoid">
            <GalleryWidget
              widget={item.widget}
              height={item.height}
              renderer={renderer}
              onClick={() => setSelectedWidget(item.widget)}
            />
          </div>
        ))}
      </div>

      {selectedWidget && (
        <WidgetPreviewModal
          widget={selectedWidget}
          renderer={renderer}
          onClose={() => setSelectedWidget(null)}
          onOpenInEditor={handleOpenInEditor}
        />
      )}
    </div>
  );
}
