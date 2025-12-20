import React, { useState, useRef } from 'react';
import {
  User as UserIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  Store as StoreIcon,
  Factory as FactoryIcon,
  FileText as FileTextIcon,
  IdCard as IdCardIcon,
  Upload as UploadIcon,
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
  XCircle as XCircleIcon,
  Key as KeyIcon,
  Shield as ShieldIcon,
  Info as InfoIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Camera as CameraIcon,
  Building as BuildingIcon,
  Briefcase as BriefcaseIcon,
  AlertCircle as AlertCircleIcon,
  CreditCard as CreditCardIcon,
  Lock as LockIcon,
  File as FileIcon,
  FileCheck as FileCheckIcon,
  X as XIcon,
  AlertTriangle as AlertTriangleIcon
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { addNotification } = useNotification();

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  // Clean form data - only essential fields
  const [formData, setFormData] = useState({
    // Basic Identity Card
    fullName: user?.fullName || '',
    nicNumber: user?.nicNumber || '',
    
    // Business Role Confirmation
    businessRole: user?.businessRole || '', // 'dealer', 'mill_owner', 'both'
    
    // Business Verification (conditional)
    // For Dealers/Both
    businessName: user?.businessName || '',
    businessRegistrationNumber: user?.businessRegistrationNumber || '',
    // For Mill Owners/Both
    riceMillName: user?.riceMillName || '',
    millLocation: user?.millLocation || '',
    
    // Contact Information (light)
    phoneNumber: user?.phoneNumber || '',
    email: user?.email || '',
    townCity: user?.townCity || '',
  });

  // Document uploads state
  const [documents, setDocuments] = useState({
    nicFront: user?.documents?.nicFront || { file: null, uploaded: false, preview: null, name: '' },
    nicBack: user?.documents?.nicBack || { file: null, uploaded: false, preview: null, name: '' },
    businessCertificate: user?.documents?.businessCertificate || { file: null, uploaded: false, preview: null, name: '' },
    riceMillCertificate: user?.documents?.riceMillCertificate || { file: null, uploaded: false, preview: null, name: '' },
    
    // Optional Documents
    dealerLicense: user?.documents?.dealerLicense || { file: null, uploaded: false, preview: null, name: '' },
    millOwnershipProof: user?.documents?.millOwnershipProof || { file: null, uploaded: false, preview: null, name: '' },
  });

  // File input refs
  const fileRefs = {
    nicFront: useRef(null),
    nicBack: useRef(null),
    businessCertificate: useRef(null),
    riceMillCertificate: useRef(null),
    dealerLicense: useRef(null),
    millOwnershipProof: useRef(null),
  };

  // Verification Status
  const [verificationStatus, setVerificationStatus] = useState({
    status: user?.verificationStatus?.status || 'pending', // 'pending', 'verified', 'rejected'
    reason: user?.verificationStatus?.reason || '',
    verifiedDate: user?.verificationStatus?.verifiedDate || null,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('identity'); // 'identity', 'business', 'documents', 'security'
  const [uploadingDoc, setUploadingDoc] = useState(null);
  const [documentErrors, setDocumentErrors] = useState({});

  // Calculate profile completion
  const calculateProfileCompletion = () => {
    let total = 0;
    let completed = 0;

    // Basic Identity (40%)
    total += 40;
    if (formData.fullName.trim()) completed += 10;
    if (formData.nicNumber.trim()) completed += 10;
    if (documents.nicFront.uploaded) completed += 10;
    if (documents.nicBack.uploaded) completed += 10;

    // Business Role (20%)
    total += 20;
    if (formData.businessRole) completed += 20;

    // Business Verification (30%)
    total += 30;
    if (formData.businessRole === 'dealer' || formData.businessRole === 'both') {
      if (formData.businessName.trim()) completed += 10;
      if (documents.businessCertificate.uploaded) completed += 10;
    }
    if (formData.businessRole === 'mill_owner' || formData.businessRole === 'both') {
      if (formData.riceMillName.trim()) completed += 5;
      if (formData.millLocation.trim()) completed += 5;
      if (documents.riceMillCertificate.uploaded) completed += 10;
    }

    // Contact Info (10%)
    total += 10;
    if (formData.phoneNumber.trim()) completed += 10;

    return Math.round((completed / total) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePasswordChange = e => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleBusinessRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      businessRole: role,
      ...(role !== 'dealer' && role !== 'both' ? { 
        businessName: '', 
        businessRegistrationNumber: '' 
      } : {}),
      ...(role !== 'mill_owner' && role !== 'both' ? { 
        riceMillName: '', 
        millLocation: '' 
      } : {}),
    }));
  };

  const handleFileSelect = (docType, e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      addNotification('error', 'File size must be less than 5MB');
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      addNotification('error', 'Only JPG, PNG, and PDF files are allowed');
      return;
    }

    handleDocumentUpload(docType, file);
  };

  const handleDocumentUpload = async (docType, file) => {
    setUploadingDoc(docType);
    
    try {
      // Create preview URL for images
      let preview = null;
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setDocuments(prev => ({
        ...prev,
        [docType]: {
          file,
          uploaded: true,
          preview,
          name: file.name,
          uploadedAt: new Date().toISOString(),
          status: 'pending'
        }
      }));

      // Clear any previous errors for this document
      setDocumentErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[docType];
        return newErrors;
      });

      addNotification('success', `${docType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      addNotification('error', 'Failed to upload document. Please try again.');
      setDocumentErrors(prev => ({
        ...prev,
        [docType]: 'Upload failed. Please try again.'
      }));
    } finally {
      setUploadingDoc(null);
    }
  };

  const handleRemoveDocument = (docType) => {
    // Clean up preview URL if exists
    if (documents[docType].preview) {
      URL.revokeObjectURL(documents[docType].preview);
    }

    setDocuments(prev => ({
      ...prev,
      [docType]: { file: null, uploaded: false, preview: null, name: '' }
    }));

    // Clear the file input
    if (fileRefs[docType].current) {
      fileRefs[docType].current.value = '';
    }

    addNotification('info', 'Document removed');
  };

  const handleTriggerFileInput = (docType) => {
    if (fileRefs[docType].current) {
      fileRefs[docType].current.click();
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic Identity validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.nicNumber.trim()) newErrors.nicNumber = 'NIC number is required';
    
    // Business Role validation
    if (!formData.businessRole) newErrors.businessRole = 'Please select your business role';

    // Business Verification validation (conditional)
    if (formData.businessRole === 'dealer' || formData.businessRole === 'both') {
      if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    }
    if (formData.businessRole === 'mill_owner' || formData.businessRole === 'both') {
      if (!formData.riceMillName.trim()) newErrors.riceMillName = 'Rice mill name is required';
      if (!formData.millLocation.trim()) newErrors.millLocation = 'Mill location is required';
    }

    // Contact validation
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';

    // Document validation
    if (!documents.nicFront.uploaded) newErrors.nicFront = 'NIC front photo is required';
    if (!documents.nicBack.uploaded) newErrors.nicBack = 'NIC back photo is required';

    if (formData.businessRole === 'dealer' || formData.businessRole === 'both') {
      if (!documents.businessCertificate.uploaded) {
        newErrors.businessCertificate = 'Business certificate is required';
      }
    }

    if (formData.businessRole === 'mill_owner' || formData.businessRole === 'both') {
      if (!documents.riceMillCertificate.uploaded) {
        newErrors.riceMillCertificate = 'Rice mill certificate is required';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addNotification('error', 'Please fill all required fields');
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile({
        ...formData,
        documents,
        verificationStatus,
        profileCompletion
      });
      addNotification('success', 'Profile saved successfully');
      setIsEditing(false);
    } catch (error) {
      addNotification('error', 'Failed to save profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!passwordForm.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!passwordForm.newPassword) newErrors.newPassword = 'New password is required';
    if (passwordForm.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      addNotification('success', 'Password changed successfully');
      setIsChangingPassword(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      addNotification('error', 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsChangingPassword(false);
    setFormData({
      fullName: user?.fullName || '',
      nicNumber: user?.nicNumber || '',
      businessRole: user?.businessRole || '',
      businessName: user?.businessName || '',
      businessRegistrationNumber: user?.businessRegistrationNumber || '',
      riceMillName: user?.riceMillName || '',
      millLocation: user?.millLocation || '',
      phoneNumber: user?.phoneNumber || '',
      email: user?.email || '',
      townCity: user?.townCity || '',
    });
    setErrors({});
  };

  const handleImageUpload = () => {
    addNotification('info', 'Profile picture upload feature coming soon!');
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const renderVerificationBadge = () => {
    switch (verificationStatus.status) {
      case 'verified':
        return (
          <div className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
            <CheckCircleIcon className="h-4 w-4 mr-1.5" />
            Verified
          </div>
        );
      case 'rejected':
        return (
          <div className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
            <XCircleIcon className="h-4 w-4 mr-1.5" />
            Verification Required
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <ClockIcon className="h-4 w-4 mr-1.5" />
            Pending Review
          </div>
        );
    }
  };

  const renderDocumentCard = (docType, config) => {
    const { title, description, icon: Icon, required = false, color = 'blue' } = config;
    const doc = documents[docType];
    const isUploading = uploadingDoc === docType;
    const hasError = documentErrors[docType];

    const colorClasses = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        border: 'border-blue-200',
        text: 'text-blue-700'
      },
      orange: {
        bg: 'bg-orange-50',
        icon: 'text-orange-600',
        border: 'border-orange-200',
        text: 'text-orange-700'
      },
      gray: {
        bg: 'bg-gray-50',
        icon: 'text-gray-600',
        border: 'border-gray-200',
        text: 'text-gray-700'
      }
    };

    const currentColor = colorClasses[color];

    return (
      <div className={`border rounded-xl p-5 transition-all duration-200 ${currentColor.bg} ${currentColor.border} ${doc.uploaded ? 'border-green-300' : ''}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${currentColor.bg}`}>
              <Icon className={`h-5 w-5 ${currentColor.icon}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900">{title}</h4>
                {required && (
                  <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded">Required</span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
          </div>
          <div className="flex items-center">
            {doc.uploaded ? (
              <div className="flex items-center text-green-600">
                <CheckCircleIcon className="h-5 w-5" />
              </div>
            ) : required ? (
              <div className="text-sm font-medium text-red-600">Required</div>
            ) : null}
          </div>
        </div>

        {/* File input */}
        <input
          type="file"
          ref={fileRefs[docType]}
          className="hidden"
          onChange={(e) => handleFileSelect(docType, e)}
          accept=".pdf,.jpg,.jpeg,.png"
        />

        {doc.uploaded ? (
          <div className="space-y-4">
            {/* Document Preview/Info */}
            <div className={`p-4 rounded-lg ${doc.preview ? 'bg-white border' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {doc.preview ? (
                    <div className="relative w-16 h-16">
                      <img
                        src={doc.preview}
                        alt={doc.name}
                        className="w-full h-full object-cover rounded border"
                      />
                    </div>
                  ) : (
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FileIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900 text-sm truncate max-w-xs">{doc.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Uploaded • {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveDocument(docType)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove document"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={() => handleTriggerFileInput(docType)}
                variant="outline"
                className="flex-1 border-gray-300 hover:border-gray-400"
                disabled={isUploading}
              >
                {isUploading ? 'Replacing...' : 'Replace Document'}
              </Button>
              <Button
                onClick={() => {
                  if (doc.preview) {
                    window.open(doc.preview, '_blank');
                  } else if (doc.file) {
                    // For PDF files, we could open in new tab or download
                    const url = URL.createObjectURL(doc.file);
                    window.open(url, '_blank');
                    URL.revokeObjectURL(url);
                  } else {
                    addNotification('info', 'Document viewer will open in new tab');
                  }
                }}
                variant="outline"
                className="flex-1 border-gray-300 hover:border-gray-400"
              >
                View Document
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div
              onClick={() => handleTriggerFileInput(docType)}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all hover:border-gray-400 ${
                isUploading ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'
              }`}
            >
              {isUploading ? (
                <div className="space-y-3">
                  <div className="animate-spin rounded-full h-10 w-10 border-2 border-green-500 border-t-transparent mx-auto"></div>
                  <p className="text-sm font-medium text-gray-700">Uploading document...</p>
                  <p className="text-xs text-gray-500">Please wait</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 bg-gray-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                    <UploadIcon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Upload {title}</p>
                    <p className="text-sm text-gray-500 mt-1">Click to browse or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-2">JPG, PNG or PDF (max 5MB)</p>
                  </div>
                </div>
              )}
            </div>

            {hasError && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircleIcon className="h-4 w-4 text-red-600 mr-2" />
                  <p className="text-sm text-red-600">{hasError}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Document configurations
  const documentConfigs = {
    nicFront: {
      title: 'NIC Front Photo',
      description: 'Front side of your National Identity Card',
      icon: IdCardIcon,
      required: true,
      color: 'blue'
    },
    nicBack: {
      title: 'NIC Back Photo',
      description: 'Back side of your National Identity Card',
      icon: IdCardIcon,
      required: true,
      color: 'blue'
    },
    businessCertificate: {
      title: 'Business Certificate',
      description: 'Official business registration certificate',
      icon: FileTextIcon,
      required: formData.businessRole === 'dealer' || formData.businessRole === 'both',
      color: 'blue'
    },
    riceMillCertificate: {
      title: 'Rice Mill Certificate',
      description: 'Rice mill registration and operation certificate',
      icon: FactoryIcon,
      required: formData.businessRole === 'mill_owner' || formData.businessRole === 'both',
      color: 'orange'
    },
    dealerLicense: {
      title: 'Dealer License',
      description: 'Optional dealer license for enhanced verification',
      icon: StoreIcon,
      required: false,
      color: 'gray'
    },
    millOwnershipProof: {
      title: 'Mill Ownership Proof',
      description: 'Optional proof of mill ownership',
      icon: FactoryIcon,
      required: false,
      color: 'gray'
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-50 rounded-lg">
                <UserIcon className="h-6 w-6 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Dealer Profile</h1>
            </div>
            <p className="text-gray-600">Complete your profile to verify your business identity</p>
          </div>
          
          {/* Profile Completion */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 min-w-[240px] shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-700">Profile Completion</span>
              <span className="text-sm font-bold text-green-600">{profileCompletion}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {profileCompletion === 100 ? 'All requirements completed' : 'Complete required fields to verify'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('identity')}
              className={`group py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'identity'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <IdCardIcon className={`h-4 w-4 mr-2 ${
                  activeTab === 'identity' ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                Identity Verification
              </div>
            </button>
            <button
              onClick={() => setActiveTab('business')}
              className={`group py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'business'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <StoreIcon className={`h-4 w-4 mr-2 ${
                  activeTab === 'business' ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                Business Details
              </div>
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`group py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'documents'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <FileTextIcon className={`h-4 w-4 mr-2 ${
                  activeTab === 'documents' ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                Documents
              </div>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`group py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'security'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <ShieldIcon className={`h-4 w-4 mr-2 ${
                  activeTab === 'security' ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                Security
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Profile Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6 border border-gray-200 shadow-sm">
            <div className="p-6">
              {/* Profile Header */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-blue-50 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-md">
                    <UserIcon className="h-10 w-10 text-green-600" />
                  </div>
                  <button
                    onClick={handleImageUpload}
                    className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
                    title="Change profile picture"
                  >
                    <CameraIcon className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                
                <h2 className="text-lg font-semibold text-gray-900 mb-1 text-center">{formData.fullName || 'Your Name'}</h2>
                <p className="text-sm text-gray-500 text-center mb-4">
                  {formData.businessRole ? 
                    formData.businessRole === 'dealer' ? 'Registered Dealer' :
                    formData.businessRole === 'mill_owner' ? 'Rice Mill Owner' : 'Dealer & Mill Owner' :
                    'Business Profile'}
                </p>
                
                {/* Verification Status */}
                <div className="w-full mb-6">
                  {renderVerificationBadge()}
                </div>
              </div>

              {/* Quick Info */}
              <div className="space-y-4 border-t border-gray-100 pt-6">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <IdCardIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500">NIC Number</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{formData.nicNumber || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <PhoneIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{formData.phoneNumber || 'Not provided'}</p>
                  </div>
                </div>
                
                {formData.businessName && (
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <StoreIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500">Business</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{formData.businessName}</p>
                    </div>
                  </div>
                )}
                
                {formData.riceMillName && (
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FactoryIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500">Rice Mill</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{formData.riceMillName}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {/* Identity Tab */}
          {activeTab === 'identity' && (
            <Card className="border border-gray-200 shadow-sm">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <IdCardIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Identity Verification</h2>
                    </div>
                    <p className="text-gray-600">Verify your identity to confirm you're a legitimate business owner</p>
                  </div>
                  {!isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      icon={<EditIcon className="h-4 w-4" />}
                      variant="outline"
                      className="border-gray-300 hover:border-gray-400"
                    >
                      Edit Information
                    </Button>
                  )}
                </div>

                {!isEditing ? (
                  // View Mode
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Full Name
                          </label>
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <p className="text-gray-900 font-medium">{formData.fullName || 'Not provided'}</p>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            NIC Number
                          </label>
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <CreditCardIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <p className="text-gray-900 font-medium">{formData.nicNumber || 'Not provided'}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            Identity Documents
                          </label>
                          <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900">NIC Front Photo</span>
                                {documents.nicFront.uploaded ? (
                                  <div className="flex items-center text-green-600">
                                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                                    <span className="text-sm">Uploaded</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center text-gray-400">
                                    <FileIcon className="h-4 w-4 mr-1" />
                                    <span className="text-sm">Not uploaded</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900">NIC Back Photo</span>
                                {documents.nicBack.uploaded ? (
                                  <div className="flex items-center text-green-600">
                                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                                    <span className="text-sm">Uploaded</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center text-gray-400">
                                    <FileIcon className="h-4 w-4 mr-1" />
                                    <span className="text-sm">Not uploaded</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Edit Mode
                  <form onSubmit={handleSaveProfile} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                            Full Name *
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className={`block w-full pl-10 pr-4 py-3 border ${
                                errors.fullName ? 'border-red-300' : 'border-gray-300'
                              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white`}
                              placeholder="Enter your full name"
                            />
                          </div>
                          {errors.fullName && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                              <AlertCircleIcon className="h-4 w-4 mr-1" />
                              {errors.fullName}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                            NIC Number *
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <CreditCardIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="nicNumber"
                              value={formData.nicNumber}
                              onChange={handleInputChange}
                              className={`block w-full pl-10 pr-4 py-3 border ${
                                errors.nicNumber ? 'border-red-300' : 'border-gray-300'
                              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white`}
                              placeholder="Enter NIC number"
                            />
                          </div>
                          {errors.nicNumber && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                              <AlertCircleIcon className="h-4 w-4 mr-1" />
                              {errors.nicNumber}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                            NIC Front Photo *
                          </label>
                          <div className="flex flex-col gap-2">
                            {documents.nicFront.uploaded ? (
                              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center">
                                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                                  <span className="font-medium text-green-800">{documents.nicFront.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveDocument('nicFront')}
                                  className="text-gray-400 hover:text-red-600"
                                >
                                  <XIcon className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <input
                                type="file"
                                ref={fileRefs.nicFront}
                                onChange={(e) => handleFileSelect('nicFront', e)}
                                accept="image/*,.pdf"
                                className="hidden"
                              />
                            )}
                            {!documents.nicFront.uploaded && (
                              <Button
                                onClick={() => handleTriggerFileInput('nicFront')}
                                variant="outline"
                                className="w-full border-gray-300 hover:border-gray-400"
                                disabled={uploadingDoc === 'nicFront'}
                              >
                                {uploadingDoc === 'nicFront' ? 'Uploading...' : 'Upload NIC Front Photo'}
                              </Button>
                            )}
                          </div>
                          {errors.nicFront && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                              <AlertCircleIcon className="h-4 w-4 mr-1" />
                              {errors.nicFront}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                            NIC Back Photo *
                          </label>
                          <div className="flex flex-col gap-2">
                            {documents.nicBack.uploaded ? (
                              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center">
                                  <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                                  <span className="font-medium text-green-800">{documents.nicBack.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveDocument('nicBack')}
                                  className="text-gray-400 hover:text-red-600"
                                >
                                  <XIcon className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <input
                                type="file"
                                ref={fileRefs.nicBack}
                                onChange={(e) => handleFileSelect('nicBack', e)}
                                accept="image/*,.pdf"
                                className="hidden"
                              />
                            )}
                            {!documents.nicBack.uploaded && (
                              <Button
                                onClick={() => handleTriggerFileInput('nicBack')}
                                variant="outline"
                                className="w-full border-gray-300 hover:border-gray-400"
                                disabled={uploadingDoc === 'nicBack'}
                              >
                                {uploadingDoc === 'nicBack' ? 'Uploading...' : 'Upload NIC Back Photo'}
                              </Button>
                            )}
                          </div>
                          {errors.nicBack && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                              <AlertCircleIcon className="h-4 w-4 mr-1" />
                              {errors.nicBack}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4 pt-8 border-t border-gray-200">
                      <Button 
                        type="submit" 
                        icon={<SaveIcon className="h-4 w-4" />}
                        disabled={isLoading}
                        className="px-6"
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="border-gray-300 hover:border-gray-400 px-6"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </Card>
          )}

          {/* Business Tab */}
          {activeTab === 'business' && (
            <Card className="border border-gray-200 shadow-sm">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <BriefcaseIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Business Details</h2>
                    </div>
                    <p className="text-gray-600">Provide your business information for verification</p>
                  </div>
                  {!isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      icon={<EditIcon className="h-4 w-4" />}
                      variant="outline"
                      className="border-gray-300 hover:border-gray-400"
                    >
                      Edit Business
                    </Button>
                  )}
                </div>

                {!isEditing ? (
                  // View Mode
                  <div className="space-y-8">
                    {/* Business Role */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center gap-3 mb-4">
                        <StoreIcon className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Business Role</h3>
                      </div>
                      <div className="inline-flex items-center px-4 py-2 bg-white rounded-lg border border-gray-300">
                        <span className="font-medium text-gray-900 capitalize">
                          {formData.businessRole ? 
                            formData.businessRole === 'dealer' ? 'Registered Dealer' :
                            formData.businessRole === 'mill_owner' ? 'Rice Mill Owner' : 'Dealer & Mill Owner' :
                            'Not selected'}
                        </span>
                      </div>
                    </div>

                    {/* Conditional Business Info */}
                    {(formData.businessRole === 'dealer' || formData.businessRole === 'both') && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                          <StoreIcon className="h-5 w-5 text-green-600" />
                          <h3 className="text-lg font-semibold text-gray-900">Dealer Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Business Name
                              </label>
                              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-gray-900 font-medium">{formData.businessName || 'Not provided'}</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Business Registration
                              </label>
                              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-gray-900 font-medium">{formData.businessRegistrationNumber || 'Not provided'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {(formData.businessRole === 'mill_owner' || formData.businessRole === 'both') && (
                      <div className="space-y-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <FactoryIcon className="h-5 w-5 text-orange-600" />
                          <h3 className="text-lg font-semibold text-gray-900">Rice Mill Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Mill Name
                              </label>
                              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-gray-900 font-medium">{formData.riceMillName || 'Not provided'}</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Mill Location
                              </label>
                              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-gray-900 font-medium">{formData.millLocation || 'Not provided'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contact Information */}
                    <div className="space-y-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-3 mb-4">
                        <PhoneIcon className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                              Phone Number
                            </label>
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-gray-900 font-medium">{formData.phoneNumber || 'Not provided'}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                              Email Address
                            </label>
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-gray-900 font-medium">{formData.email || 'Not provided'}</p>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                              City/Town
                            </label>
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-gray-900 font-medium">{formData.townCity || 'Not provided'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Edit Mode
                  <form onSubmit={handleSaveProfile} className="space-y-8">
                    {/* Business Role Selection */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center gap-3 mb-6">
                        <StoreIcon className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Select Your Business Role *</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { value: 'dealer', label: 'Registered Dealer', description: 'I am a rice dealer', icon: StoreIcon, color: 'bg-blue-50 border-blue-200 text-blue-700' },
                          { value: 'mill_owner', label: 'Rice Mill Owner', description: 'I own a rice mill', icon: FactoryIcon, color: 'bg-orange-50 border-orange-200 text-orange-700' },
                          { value: 'both', label: 'Both', description: 'Dealer & Mill Owner', icon: BuildingIcon, color: 'bg-green-50 border-green-200 text-green-700' }
                        ].map((role) => (
                          <button
                            key={role.value}
                            type="button"
                            onClick={() => handleBusinessRoleChange(role.value)}
                            className={`p-5 border-2 rounded-xl text-left transition-all duration-200 ${
                              formData.businessRole === role.value
                                ? `${role.color} border-2`
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${
                                formData.businessRole === role.value ? 'bg-white' : 'bg-gray-100'
                              }`}>
                                <role.icon className={`h-5 w-5 ${
                                  formData.businessRole === role.value ? role.color.split(' ')[2] : 'text-gray-500'
                                }`} />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1">{role.label}</h4>
                                <p className="text-sm text-gray-500">{role.description}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                      {errors.businessRole && (
                        <p className="mt-3 text-sm text-red-600 flex items-center">
                          <AlertCircleIcon className="h-4 w-4 mr-1" />
                          {errors.businessRole}
                        </p>
                      )}
                    </div>

                    {/* Conditional Fields */}
                    {(formData.businessRole === 'dealer' || formData.businessRole === 'both') && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                          <StoreIcon className="h-5 w-5 text-blue-600" />
                          <h3 className="text-lg font-semibold text-gray-900">Dealer Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                              Business Name *
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <StoreIcon className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleInputChange}
                                className={`block w-full pl-10 pr-4 py-3 border ${
                                  errors.businessName ? 'border-red-300' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white`}
                                placeholder="Enter business name"
                              />
                            </div>
                            {errors.businessName && (
                              <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircleIcon className="h-4 w-4 mr-1" />
                                {errors.businessName}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                              BRN (Optional)
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FileTextIcon className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                name="businessRegistrationNumber"
                                value={formData.businessRegistrationNumber}
                                onChange={handleInputChange}
                                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                                placeholder="Enter BRN if available"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {(formData.businessRole === 'mill_owner' || formData.businessRole === 'both') && (
                      <div className="space-y-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <FactoryIcon className="h-5 w-5 text-orange-600" />
                          <h3 className="text-lg font-semibold text-gray-900">Rice Mill Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                              Rice Mill Name *
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FactoryIcon className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                name="riceMillName"
                                value={formData.riceMillName}
                                onChange={handleInputChange}
                                className={`block w-full pl-10 pr-4 py-3 border ${
                                  errors.riceMillName ? 'border-red-300' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white`}
                                placeholder="Enter rice mill name"
                              />
                            </div>
                            {errors.riceMillName && (
                              <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircleIcon className="h-4 w-4 mr-1" />
                                {errors.riceMillName}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                              Mill Location *
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPinIcon className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                name="millLocation"
                                value={formData.millLocation}
                                onChange={handleInputChange}
                                className={`block w-full pl-10 pr-4 py-3 border ${
                                  errors.millLocation ? 'border-red-300' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white`}
                                placeholder="Enter mill location"
                              />
                            </div>
                            {errors.millLocation && (
                              <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircleIcon className="h-4 w-4 mr-1" />
                                {errors.millLocation}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contact Information */}
                    <div className="space-y-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-3 mb-4">
                        <PhoneIcon className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <PhoneIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="tel"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleInputChange}
                              className={`block w-full pl-10 pr-4 py-3 border ${
                                errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white`}
                              placeholder="Enter phone number"
                            />
                          </div>
                          {errors.phoneNumber && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                              <AlertCircleIcon className="h-4 w-4 mr-1" />
                              {errors.phoneNumber}
                            </p>
                          )}
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                              Email Address (Optional)
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MailIcon className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                                placeholder="Enter email address"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                              City/Town
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MapPinIcon className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                name="townCity"
                                value={formData.townCity}
                                onChange={handleInputChange}
                                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                                placeholder="Enter city or town"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4 pt-8 border-t border-gray-200">
                      <Button 
                        type="submit" 
                        icon={<SaveIcon className="h-4 w-4" />}
                        disabled={isLoading}
                        className="px-6"
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="border-gray-300 hover:border-gray-400 px-6"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </Card>
          )}

          {/* Documents Tab - FIXED VERSION */}
          {activeTab === 'documents' && (
            <Card className="border border-gray-200 shadow-sm">
              <div className="p-8">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileTextIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Document Verification</h2>
                  </div>
                  <p className="text-gray-600">Upload required documents to complete your verification</p>
                </div>

                <div className="space-y-8">
                  {/* Important Notice */}
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-start gap-3">
                      <AlertTriangleIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-2">Important Notice</h3>
                        <p className="text-sm text-blue-700">
                          All required documents must be uploaded and verified before you can access Pay-Later features. 
                          Please ensure documents are clear, readable, and match the information provided in your profile.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Required Documents */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Required Documents</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {formData.businessRole === 'dealer' ? 'Dealer documents' :
                           formData.businessRole === 'mill_owner' ? 'Mill owner documents' :
                           formData.businessRole === 'both' ? 'Dealer and mill owner documents' :
                           'Please select business role first'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Completed:</span>
                        <span className="font-semibold text-green-600">
                          {Object.keys(documents).filter(key => 
                            documents[key].uploaded && 
                            documentConfigs[key]?.required
                          ).length} / {
                            Object.keys(documentConfigs).filter(key => 
                              documentConfigs[key]?.required &&
                              (formData.businessRole === 'both' || 
                               !documentConfigs[key].title.includes('Certificate') ||
                               (documentConfigs[key].title === 'Business Certificate' && 
                                (formData.businessRole === 'dealer' || formData.businessRole === 'both')) ||
                               (documentConfigs[key].title === 'Rice Mill Certificate' && 
                                (formData.businessRole === 'mill_owner' || formData.businessRole === 'both')))
                            ).length
                          }
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Always show NIC documents */}
                      {renderDocumentCard('nicFront', documentConfigs.nicFront)}
                      {renderDocumentCard('nicBack', documentConfigs.nicBack)}
                      
                      {/* Conditionally show business certificate */}
                      {(formData.businessRole === 'dealer' || formData.businessRole === 'both') && 
                       renderDocumentCard('businessCertificate', documentConfigs.businessCertificate)}
                      
                      {/* Conditionally show rice mill certificate */}
                      {(formData.businessRole === 'mill_owner' || formData.businessRole === 'both') && 
                       renderDocumentCard('riceMillCertificate', documentConfigs.riceMillCertificate)}
                    </div>

                    {/* Business Role Warning */}
                    {!formData.businessRole && (
                      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                        <div className="flex items-center gap-2">
                          <AlertCircleIcon className="h-5 w-5 text-amber-600" />
                          <p className="text-sm text-amber-700">
                            Please select your business role in the Business Details tab to see all required documents.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Optional Documents */}
                  <div className="space-y-6 pt-8 border-t border-gray-200">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">Optional Documents</h3>
                        <span className="text-sm font-medium text-gray-500">For enhanced trust</span>
                      </div>
                      <p className="text-sm text-gray-500">These documents are not required but can help build trust with partners</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {renderDocumentCard('dealerLicense', documentConfigs.dealerLicense)}
                      {renderDocumentCard('millOwnershipProof', documentConfigs.millOwnershipProof)}
                    </div>
                  </div>

                  {/* Document Upload Tips */}
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-start gap-3">
                      <InfoIcon className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-green-900 mb-2">Document Upload Tips</h3>
                        <ul className="text-sm text-green-700 space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-600 mt-1.5"></div>
                            <span>Ensure documents are clear and all text is readable</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-600 mt-1.5"></div>
                            <span>Upload high-quality images or scanned PDFs</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-600 mt-1.5"></div>
                            <span>File size should not exceed 5MB per document</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-600 mt-1.5"></div>
                            <span>Accepted formats: JPG, PNG, PDF</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Verification Status */}
                  <div className="pt-8 border-t border-gray-200">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg border border-gray-200">
                            <ShieldIcon className="h-5 w-5 text-gray-700" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">Verification Status</h3>
                            <p className="text-sm text-gray-500">Your current verification standing</p>
                          </div>
                        </div>
                        {renderVerificationBadge()}
                      </div>
                      
                      {verificationStatus.reason && (
                        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                          <div className="flex items-start gap-2">
                            <InfoIcon className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-900">Verification Note</p>
                              <p className="text-sm text-gray-600 mt-1">{verificationStatus.reason}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {verificationStatus.verifiedDate && (
                        <div className="mt-4 text-sm text-gray-600">
                          <span className="font-medium">Verified on: </span>
                          {new Date(verificationStatus.verifiedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      )}
                      
                      {/* Document Summary */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-3">Document Summary</h4>
                        <div className="space-y-3">
                          {Object.entries(documents)
                            .filter(([key, doc]) => doc.uploaded)
                            .map(([key, doc]) => (
                              <div key={key} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                <div className="flex items-center space-x-3">
                                  <FileCheckIcon className="h-4 w-4 text-green-600" />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      {documentConfigs[key]?.title || key}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {doc.name} • Uploaded {new Date().toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleRemoveDocument(key)}
                                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                  title="Remove document"
                                >
                                  <XIcon className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          
                          {Object.values(documents).filter(doc => doc.uploaded).length === 0 && (
                            <div className="text-center py-8">
                              <FileIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                              <p className="text-gray-500">No documents uploaded yet</p>
                              <p className="text-sm text-gray-400 mt-1">Upload your documents to complete verification</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <Card className="border border-gray-200 shadow-sm">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <LockIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Account Security</h2>
                    </div>
                    <p className="text-gray-600">Manage your account security settings</p>
                  </div>
                  {!isChangingPassword && (
                    <Button
                      onClick={() => setIsChangingPassword(true)}
                      icon={<KeyIcon className="h-4 w-4" />}
                      variant="outline"
                      className="border-gray-300 hover:border-gray-400"
                    >
                      Change Password
                    </Button>
                  )}
                </div>

                {!isChangingPassword ? (
                  // Security Overview
                  <div className="space-y-8">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircleIcon className="h-6 w-6 text-green-600" />
                        <h3 className="text-lg font-semibold text-green-900">Account Security Status</h3>
                      </div>
                      <p className="text-green-700 mb-4">Your account security is up to date</p>
                      <div className="text-sm text-green-600">
                        <div className="flex items-center gap-2">
                          <CheckCircleIcon className="h-4 w-4" />
                          <span>Email verification completed</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                          <ShieldIcon className="h-5 w-5 text-blue-600" />
                          <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account</p>
                        <Button variant="outline" className="w-full border-gray-300 hover:border-gray-400">
                          Enable 2FA
                        </Button>
                      </div>

                      <div className="p-5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                          <InfoIcon className="h-5 w-5 text-blue-600" />
                          <h3 className="font-semibold text-gray-900">Login Activity</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Review recent sign-ins to your account</p>
                        <Button variant="outline" className="w-full border-gray-300 hover:border-gray-400">
                          View Activity
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Change Password Form
                  <form onSubmit={handleChangePassword} className="space-y-8">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <div className="flex items-start gap-3">
                        <InfoIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-blue-900 mb-2">Password Requirements</h3>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                              Minimum 8 characters long
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                              Include uppercase and lowercase letters
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                              Include at least one number
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                              Should not match your current password
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {[
                        { label: 'Current Password', name: 'currentPassword' },
                        { label: 'New Password', name: 'newPassword' },
                        { label: 'Confirm New Password', name: 'confirmPassword' }
                      ].map((field, idx) => (
                        <div key={idx}>
                          <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                            {field.label}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <LockIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type={showPassword[field.name] ? 'text' : 'password'}
                              name={field.name}
                              value={passwordForm[field.name]}
                              onChange={handlePasswordChange}
                              className={`block w-full pl-10 pr-10 py-3 border ${
                                errors[field.name] ? 'border-red-300' : 'border-gray-300'
                              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white`}
                              placeholder={`Enter your ${field.label.toLowerCase()}`}
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(field.name)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                              title={showPassword[field.name] ? 'Hide password' : 'Show password'}
                            >
                              {showPassword[field.name] ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                          </div>
                          {errors[field.name] && (
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                              <AlertCircleIcon className="h-4 w-4 mr-1" />
                              {errors[field.name]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-4 pt-8 border-t border-gray-200">
                      <Button 
                        type="submit" 
                        icon={<KeyIcon className="h-4 w-4" />}
                        disabled={isLoading}
                        className="px-6"
                      >
                        {isLoading ? 'Updating...' : 'Update Password'}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setIsChangingPassword(false);
                          setPasswordForm({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                          });
                          setErrors({});
                        }}
                        disabled={isLoading}
                        className="border-gray-300 hover:border-gray-400 px-6"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;