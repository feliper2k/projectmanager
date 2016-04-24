import { range } from 'lodash';

function PaginatedTable($compile, $templateCache) {
    'ngInject';

    return {
        restrict: 'A',

        controller: function($scope, $attrs) {
            'ngInject';

            $scope.$watchGroup([$attrs.source, $attrs.postsPerPage], values => {
                [ this.source, this.postsPerPage ] = values;
                this.navigate(this.activePage);
            });

            $scope.$on('tableViewUpdateRequest', () => {
                this.navigate(this.activePage);
            });

            this.activePage = 0;
            this.navigate = (page) => {
                const start = page * this.postsPerPage;
                const limitString = `${start},${this.postsPerPage}`;

                this.source.query({ limit: limitString }, (content, headersFn) => {
                    this.posts = content;
                    this.totalCount = headersFn('x-total-count');
                    this.activePage = page;

                    const totalPages = Math.ceil(this.totalCount/this.postsPerPage);

                    this.canNavigate = {
                        back: this.activePage > 0,
                        forward: this.activePage < totalPages-1
                    };
                    this.pages = range(totalPages).map(index => {
                        return {
                            index,
                            label: index + 1,
                            active: index === this.activePage
                        };
                    });
                });
            }
        },

        link: function(scope, element, attrs) {
            const pagination = $templateCache.get('directives/paginated-table.html');
            const compiledTemplate = $compile(pagination)(scope);
            element.after(compiledTemplate);
        },

        controllerAs: 'table'
    };
}

export default {
  name: 'paginatedTable',
  fn: PaginatedTable
};
