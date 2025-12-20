// src/pages/RegisterSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Mail, Clock, Shield } from "lucide-react";

const RegisterSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Application Submitted!
          </h2>
          
          <p className="mt-4 text-lg text-gray-600">
            Your account is now under review
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start">
            <Shield className="h-6 w-6 text-green-500 mt-1 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Admin Verification</h3>
              <p className="text-gray-600 text-sm mt-1">
                Our team will verify your documents within 24-48 hours
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Mail className="h-6 w-6 text-green-500 mt-1 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Email Confirmation</h3>
              <p className="text-gray-600 text-sm mt-1">
                You will receive an email once your account is approved
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="h-6 w-6 text-green-500 mt-1 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Next Steps</h3>
              <p className="text-gray-600 text-sm mt-1">
                After approval, you can access all features including the Pay-Later option
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/login"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
          >
            Go to Login Page
          </Link>
          
          <p className="text-center text-gray-500 text-sm mt-6">
            Need help?{" "}
            <a href="mailto:support@ricemill.com" className="text-green-600 hover:text-green-700">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;