const API_URL = 'https://hyperbolic-model-registry-production.up.railway.app/api/models';

const sampleModels = [
  {
    name: 'EfficientNet-B0',
    version: '1.0.0',
    framework: 'PyTorch',
    description: 'Efficient convolutional neural network optimized for mobile devices'
  },
  {
    name: 'RoBERTa',
    version: '1.0',
    framework: 'TensorFlow',
    description: 'Robustly optimized BERT pretraining approach'
  },
  {
    name: 'MobileNetV3',
    version: '3.0',
    framework: 'PyTorch',
    description: 'Lightweight computer vision model for mobile applications'
  },
  {
    name: 'CLIP',
    version: '1.0',
    framework: 'PyTorch',
    description: 'Contrastive Language-Image Pre-training model'
  },
  {
    name: 'FLAIR',
    version: '0.11',
    framework: 'PyTorch',
    description: 'Framework for state-of-the-art NLP'
  },
  {
    name: 'Detectron2',
    version: '0.6',
    framework: 'PyTorch',
    description: 'Facebook AI Research\'s object detection platform'
  },
  {
    name: 'ALBERT',
    version: '2.0',
    framework: 'TensorFlow',
    description: 'A Lite BERT for Self-supervised Learning of Language Representations'
  },
  {
    name: 'Swin Transformer',
    version: '1.0',
    framework: 'PyTorch',
    description: 'Hierarchical vision transformer using shifted windows'
  },
  {
    name: 'GPT-3',
    version: '3.0',
    framework: 'PyTorch',
    description: 'Large language model with 175 billion parameters'
  },
  {
    name: 'YOLOv5',
    version: '6.0',
    framework: 'PyTorch',
    description: 'Real-time object detection system'
  },
  {
    name: 'T5',
    version: '1.1',
    framework: 'TensorFlow',
    description: 'Text-to-Text Transfer Transformer'
  },
  {
    name: 'ResNet-50',
    version: '1.0',
    framework: 'PyTorch',
    description: 'Deep residual learning for image recognition'
  },
  {
    name: 'BERT',
    version: '1.0',
    framework: 'TensorFlow',
    description: 'Bidirectional Encoder Representations from Transformers'
  },
  {
    name: 'DALL-E',
    version: '2.0',
    framework: 'PyTorch',
    description: 'Text-to-image generation model'
  },
  {
    name: 'Stable Diffusion',
    version: '1.5',
    framework: 'PyTorch',
    description: 'Latent text-to-image diffusion model'
  },
  {
    name: 'ViT',
    version: '1.0',
    framework: 'PyTorch',
    description: 'Vision Transformer for image classification'
  },
  {
    name: 'DeiT',
    version: '1.0',
    framework: 'PyTorch',
    description: 'Data-efficient image Transformer'
  },
  {
    name: 'DistilBERT',
    version: '1.0',
    framework: 'PyTorch',
    description: 'Distilled version of BERT'
  },
  {
    name: 'EfficientNetV2',
    version: '1.0',
    framework: 'TensorFlow',
    description: 'Improved version of EfficientNet'
  },
  {
    name: 'ConvNeXt',
    version: '1.0',
    framework: 'PyTorch',
    description: 'Modern ConvNet for the 2020s'
  },
  {
    name: 'MAE',
    version: '1.0',
    framework: 'PyTorch',
    description: 'Masked Autoencoders for self-supervised learning'
  },
  {
    name: 'DETR',
    version: '1.0',
    framework: 'PyTorch',
    description: 'End-to-end object detection with transformers'
  },
  {
    name: 'PaLM',
    version: '1.0',
    framework: 'TensorFlow',
    description: 'Pathways Language Model'
  },
  {
    name: 'LaMDA',
    version: '1.0',
    framework: 'TensorFlow',
    description: 'Language Model for Dialogue Applications'
  }
];

async function loadSampleData() {
  console.log('Loading sample data...');
  
  for (const model of sampleModels) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Successfully added model: ${model.name}`);
    } catch (error) {
      console.error(`Failed to add model ${model.name}:`, error);
    }
  }

  console.log('Sample data loading complete!');
}

loadSampleData(); 