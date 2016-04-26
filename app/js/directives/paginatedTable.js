import { range } from 'lodash';

function PaginatedTable($compile, $templateCache) {
    'ngInject';

    function controller($scope, $attrs) {
        'ngInject';

        $scope.$watchGroup([ $attrs.source, $attrs.postsPerPage, $attrs.filter ], values => {
            [ this.source, this.postsPerPage, this.filter ] = values;
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
                this.pages = range(totalPages).map(index => ({
                    index,
                    label: index + 1,
                    active: index === this.activePage
                }));
            });
        }
    }

    function link(scope, element, attrs) {
        const pagination = $templateCache.get('directives/paginated-table.html');
        const compiledTemplate = $compile(pagination)(scope);
        element.after(compiledTemplate);
    }

    return {
        restrict: 'A',
        controller,
        link,
        controllerAs: 'table'
    };
}

export default {
  name: 'paginatedTable',
  fn: PaginatedTable
};
