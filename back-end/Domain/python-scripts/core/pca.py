import numpy as np
from pathlib import Path

class PCA:

    def __init__(self,input:np.ndarray,n_components:int,finance:bool=True):
        """
            Create a representation class that contains
            all information about PCA 

            # Args:
                input: R^nxm numpy.array
                n_components: int, number of components to compute
        """
        assert type(input) == np.ndarray, "input type has be numpy.array"
        assert type(n_components) == int, "n_components type has be int"
        assert len(input.shape) == 2, "the matrix has be nxm"
        assert type(finance) == bool, "the finance has be boolean value"

        self.input = input
        self.n_components=n_components
        self.finance = finance

        self.standardize_input()
        self.compute_corr()
        self.compute_eigs()
        self.compute_explained_variance()
        self.get_projection_matrix()

    def standardize_input(self):
        """
            Compute the normalization for input 
            using the mean and standard deviation 

            # Returns:
                * standarded_input: R^nxm numpy.array normalized
        """


        standarded_input = (self.input-np.mean(self.input,axis=0))/np.std(self.input,axis=0)
        
        standarded_input = np.nan_to_num(standarded_input)
        
        self.standarded_input = standarded_input

        

        return standarded_input

    def compute_cov (self):
        """
            Compute the covarience matrix to
            calculate PCA

            # Returns:
                * cov_matrix: R^nxm np.arry that is the covariance matrix 

        """
        mean_lines = np.mean(self.standarded_input,axis=0)
        cov_matrix = (self.standarded_input-mean_lines).T.dot(self.standarded_input-mean_lines)/(self.standarded_input.shape[0]-1)

        cov_matrix = np.nan_to_num(cov_matrix)

        self.cov_matrix = cov_matrix


        return cov_matrix
    
    def compute_corr(self):
        """
            Compute correlation matrix, this matrix is constantly used by finance
            to compute pca.

            # Returns:
                * corr_matrix: Rnxm matrix with correlation values 
        
        """
        self.compute_cov()

        diagonal_cov = np.diagonal(self.cov_matrix)

        #get squared diagonal fill with 0 to do diagonal.dot(diagonal.T)
        zeros_matrix = np.zeros((diagonal_cov.shape[0],diagonal_cov.shape[0]))
        zeros_matrix[:,0] = diagonal_cov
        diagonal_cov = zeros_matrix

        diagonal_cov_matrix = diagonal_cov.dot(diagonal_cov.T)

        corr_matrix = self.cov_matrix/np.power(diagonal_cov_matrix,1/2)

        self.corr_matrix= corr_matrix
        return corr_matrix


    def compute_eigs(self):
        """
            Compute eigvectors and eigvalues from correlation or covariance matrix

            # Returns:
                * eig_vectors: np.array R^nxm with n eigvectors
                * eig_values : np.array R^n with n eigvalues 

        """

        if self.finance:
            matrix = self.corr_matrix
        else :
            matrix = self.cov_matrix      

        matrix = np.nan_to_num(matrix)

        eig_values,eig_vectors = np.linalg.eig(matrix)
        self.eig_values = eig_values
        self.eig_vectors = eig_vectors

        eig_pairs = [(np.abs(eig_values[i]),eig_vectors[:,i]) for i in range(len(eig_values))]
        eig_pairs.sort(key = lambda x:x[0],reverse=True)
        self.eig_pairs = eig_pairs
    
        return eig_vectors,eig_values


    def compute_explained_variance(self):
        """
            Compute the explained variance from eigvalues


            # Returns:
                * var_exp: list[float], individual explained variance
                * cum_var_exp: np.array dtype float, cumulative explained variance
        """
        total = sum(self.eig_values)

        var_exp = [(i/total)*100 for i in sorted(self.eig_values,reverse=True)]
        cum_var_exp = np.cumsum(var_exp)

        self.var_exp = var_exp
        self.cum_var_exp = cum_var_exp

        return var_exp,cum_var_exp


    def get_projection_matrix(self):
        """
            Build projection matrix to change dimension of data

            # Returns:
                * projection_matrix: R^mxn_components projection matrix
        """
        eig_vectors = [self.eig_pairs[i][1] for i in range(len(self.eig_values))]
        projection_matrix = np.array(eig_vectors)[:self.n_components].T

        self.projection_matrix = projection_matrix

        return projection_matrix

    def get_reduced_input(self):
        """
            Compute the reduced input from original input
            and projection matrix

            # Returns: 
                * reduced_input: R^nxn_components new input data
        
        """
        reduced_data = self.standarded_input.dot(self.projection_matrix)
        self.reduced_input = reduced_data

        return reduced_data