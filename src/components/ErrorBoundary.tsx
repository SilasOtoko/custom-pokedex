import * as React from 'react';
import { Link } from 'react-router';
import crateImage from '../images/pokemon-crate.svg';

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-4xl mx-auto px-8 py-20 w-full">
          <h1 className="sr-only">Page Error</h1>
          <img
            src={crateImage}
            alt="Wooden crate with Trainer Supply Co logo on it"
            className="w-48 h-48"
            width="192"
            height="192"
          />
          <p className="text-4xl font-extrabold mt-12">
            Uh oh. Looks like something has fallen off the wagon.
          </p>
          <p className="mt-4 text-lg">
            Please bring this crate back to the shop for us or simply refresh
            the page.
          </p>
          <div className="flex justify-start">
            <Link
              to="/shop"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-white bg-gray-800 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer duration-300 transition-colors mt-4"
            >
              <span>←</span>
              <span>Bring to the shop</span>
            </Link>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
